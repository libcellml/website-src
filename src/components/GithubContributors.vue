<template>
  <v-container>
    <v-row v-if="status === 'ready'">
      <v-col
        v-for="person in allContributors"
        :key="`person-id-${person.login}`"
        class="col-12 col-sm-6 col-md-3"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a v-on="on" :href="person.url" target="_blank">
              <v-row no-gutters>
                <v-col>
                  <img
                    class="avatar_img"
                    :src="person.avatar_url"
                    :alt="person.name"
                  />
                </v-col>
                <v-col class="avatar_name">{{ person.name }}</v-col>
              </v-row>
            </a>
          </template>
          <span>
            <strong>{{ person.name }}</strong> contributed to:
            <ul
              v-for="repo in person.repos"
              :key="`contrib_${person.login}_${repo.org}_${repo.repo}`"
            >
              <li>{{ repo.name }}</li>
            </ul>
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row v-else-if="status === 'overuse'">
      <v-col>
        <h4>Contributor listing</h4>
        <p>
          We have been pestering GitHub too much to get the contributor list
          from there ourselves. Please try again after
          {{ resetTime }}.
        </p></v-col
      >
    </v-row>
    <v-row v-else>
      <v-col>
        <h4>Contributor listing</h4>
        <p>
          Something has gone wrong getting the contributor information from
          GitHub. Please try again later.
        </p></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

import github from '@/services/github'

const repos = [
  { org: 'cellml', repo: 'libcellml', name: 'libCellML code base' },
  { org: 'libcellml', repo: 'website-src', name: 'libCellML website' },
  {
    org: 'kerimoyle',
    repo: 'libcellml-tutorials',
    name: 'libCellML documentation',
  },
]

const skipUser = '[bot]'

export default {
  name: 'GithubContributors',
  data: () => {
    return {
      user_data: [],
      status: 'error',
      resetTime: undefined,
    }
  },
  mounted() {
    this.status = 'error'
    this.resetTime = undefined
    github
      .rateLimit()
      .then(response => {
        if (response.rate.remaining >= repos.length) {
          let fetchContributors = []
          for (const r of repos) {
            fetchContributors.push(github.contributors(r.org, r.repo))
          }
          Promise.all(fetchContributors)
            .then(contributorList => {
              let users = []
              let index = 0
              for (const v of contributorList) {
                for (const u of v) {
                  if (u.login.includes(skipUser)) {
                    continue
                  } else {
                    const indexOfUser = users.findIndex(
                      user => user.login === u.login,
                    )
                    if (indexOfUser !== -1) {
                      users[indexOfUser].repos.push(repos[index])
                    } else {
                      users.push({ login: u.login, repos: [repos[index]] })
                    }
                  }
                }
                index++
              }

              if (
                response.rate.remaining - repos.length >=
                Object.keys(users).length
              ) {
                let fetchUsers = []
                for (const u of users) {
                  fetchUsers.push(github.user(u.login))
                }

                Promise.all(fetchUsers)
                  .then(userDataList => {
                    let userData = []
                    let indexOfUser = 0
                    for (const u of userDataList) {
                      userData.push({
                        name: u.name,
                        login: u.login,
                        avatar_url: u.avatar_url,
                        url: u.html_url,
                        repos: users[indexOfUser].repos,
                        index: Math.random(), // Used for getting a random display order
                      })
                      indexOfUser++
                    }

                    this.user_data = userData.sort(function(a, b) {
                      return a.index - b.index
                    })
                    this.status = 'ready'
                  })
                  .catch(error => {
                    this.add({
                      type: 'error',
                      title: 'Fetching users failed:',
                      message: error.message,
                    })
                  })
              } else {
                this.serviceOveruse(response.rate.reset)
              }
            })
            .catch(error => {
              this.add({
                type: 'error',
                title: 'Fetching contributors failed:',
                message: error.message,
              })
            })
        } else {
          this.serviceOveruse(response.rate.reset)
        }
      })
      .catch(error => {
        this.add({
          type: 'error',
          title: 'GitHub get rate limit error:',
          message: error.message,
        })
      })
  },
  computed: {
    allContributors() {
      return this.user_data
    },
  },
  methods: {
    serviceOveruse(reset) {
      // console.log('We have used this service too much, please try again after:')
      const d = new Date(reset * 1000)
      const time = Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(d)
      this.resetTime = time
      this.status = 'overuse'
    },
    ...mapActions('notifications', ['add']),
  },
}
</script>

<style scoped>
.avatar_img {
  max-width: 4em;
  border-radius: 50%;
}
.avatar_name {
  text-align: left;
  line-height: normal;
  margin: auto;
}
a {
  text-decoration: none;
  color: var(--text-colour) !important;
}
</style>
