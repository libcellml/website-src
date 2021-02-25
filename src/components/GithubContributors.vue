<template>
  <v-container>
    <v-row>
      <v-col
        v-for="person in allContributors"
        :key="`person-id-${person.login}`"
        class="col-4 col-6-sm"
      >
        <!-- OPTION 1: Avatars with hover info, clickable to user link -->
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a v-on="on" :href="person.url" target="_blank">
              <v-avatar>
                <img :src="person.avatar_url" :alt="person.name" />
              </v-avatar>
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
        </v-tooltip> -->

        <!-- OPTION 2: Avatar with name underneath -->
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a v-on="on" :href="person.url" target="_blank">
              <div class="avatar_card">
                <img
                  class="avatar"
                  :src="person.avatar_url"
                  :alt="person.name"
                />

                <div class="avatar_name">{{ person.name }}</div>
              </div>
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
        </v-tooltip> -->

        <!-- OPTION 3: Avatar with name on the side -->
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
  </v-container>
</template>

<script>
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
  data: () => ({
    user_data: [],
  }),
  mounted: function () {
    function githubGetContributors(org, repo) {
      let p = new Promise(function (pResolve, pReject) {
        let req = new XMLHttpRequest()
        let url =
          'https://api.github.com/repos/' + org + '/' + repo + '/contributors'
        req.open('GET', url)
        req.setRequestHeader(
          'Authorization',
          'token ' + process.env.VUE_APP_GITHUB_TOKEN,
        )
        req.onload = function () {
          if (req.status == 200) {
            pResolve(req.response)
          } else {
            pReject(
              'Oops!' +
                req.status +
                ": Can't access repository: " +
                org +
                '/' +
                repo,
            )
          }
        }
        req.send()
      })
      return p
    }

    function githubGetUser(user) {
      let p = new Promise(function (pResolve, pReject) {
        let req = new XMLHttpRequest()
        let url = 'https://api.github.com/users/' + user.login
        req.open('GET', url)
        req.setRequestHeader(
          'Authorization',
          'token ' + process.env.VUE_APP_GITHUB_TOKEN,
        )
        console.log('added token to get user')
        req.onload = function () {
          if (req.status == 200) {
            console.log({ response: req.response, repos: user.repos })
            pResolve({ response: req.response, repos: user.repos })
          } else {
            pReject("Oops, can't get user: " + user.login)
          }
        }
        req.send()
      })
      return p
    }

    let fetchContributors = []
    for (let r in repos) {
      fetchContributors.push(githubGetContributors(repos[r].org, repos[r].repo))
    }

    Promise.all(fetchContributors).then((values) => {
      let users = {}
      for (var v in values) {
        let temp = JSON.parse(values[v])
        for (let u in temp) {
          let user = temp[u].login
          if (user.includes(skipUser)) {
            console.log('Skipping ', user)
            continue
          } else if (users[user]) {
            users[user].repos.push(repos[v])
          } else {
            users[user] = { login: user, repos: [repos[v]] }
          }
        }
      }

      let fetchUsers = []
      for (let u in users) {
        fetchUsers.push(githubGetUser(users[u]))
      }

      Promise.all(fetchUsers).then((userDataArray) => {
        let userData = []
        for (let u in userDataArray) {
          let tempUser = JSON.parse(userDataArray[u].response)
          console.log('tempUser: ', tempUser)
          userData.push({
            name: tempUser.name,
            login: tempUser.login,
            avatar_url: tempUser.avatar_url,
            url: tempUser.html_url,
            repos: userDataArray[u].repos,
            index: Math.random(), // Used for getting a random display order
          })
        }
        // Randomising the order of people
        this.user_data = userData.sort(function (a, b) {
          return a.index - b.index
        })
      })
    })
  },

  computed: {
    allContributors() {
      return this.user_data
    },
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
