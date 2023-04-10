<template>
  <v-container>
    <v-row v-if="status === 'ready'">
      <v-col
        v-for="person in userData"
        :key="`person-id-${person.login}`"
        col="12"
        sm="6"
        md="3"
      >
        <v-tooltip anchor="bottom">
          <template v-slot:activator="{ props }">
            <a v-bind="props" :href="person.url" target="_blank">
              <v-row no-gutters>
                <v-col>
                  <img
                    class="avatar_img"
                    :src="person.avatar_url"
                    :alt="person.name"
                  />
                </v-col>
                <v-col class="avatar_name">{{
                  person.name || person.login
                }}</v-col>
              </v-row>
            </a>
          </template>
          <span>
            <strong>{{ person.name || person.login }}</strong> contributed to:
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

<script setup>
import { onMounted, ref } from 'vue'

import { useNotificationsStore } from '@/stores/notifications'
import github from '@/services/github'

const repos = [
  { org: 'cellml', repo: 'libcellml', name: 'libCellML library' },
  { org: 'libcellml', repo: 'website-src', name: 'libCellML website' },
  {
    org: 'libcellml',
    repo: 'userguides',
    name: 'libCellML documentation',
  },
]

const store = useNotificationsStore()

const skippedUsers = ['dependabot[bot]', 'abi-git-user']

const userData = ref([])
const status = ref('error')
let resetTime = undefined

onMounted(() => {
  status.value = 'error'
  resetTime = undefined
  github
    .rateLimit()
    .then((response) => {
      if (response.rate.remaining >= repos.length) {
        let fetchContributors = []
        for (const r of repos) {
          fetchContributors.push(github.contributors(r.org, r.repo))
        }
        Promise.all(fetchContributors)
          .then((contributorList) => {
            let users = []
            let index = 0
            for (const v of contributorList) {
              for (const u of v) {
                if (skippedUsers.includes(u.login)) {
                  continue
                } else {
                  const indexOfUser = users.findIndex(
                    (user) => user.login === u.login
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

            if (response.rate.remaining - repos.length >= users.length) {
              let fetchUsers = []
              for (const u of users) {
                fetchUsers.push(github.user(u.login))
              }

              Promise.all(fetchUsers)
                .then((userDataList) => {
                  let tmpUserData = []
                  let indexOfUser = 0
                  for (const u of userDataList) {
                    tmpUserData.push({
                      name: u.name,
                      login: u.login,
                      avatar_url: u.avatar_url,
                      url: u.html_url,
                      repos: users[indexOfUser].repos,
                      index: Math.random(), // Used for getting a random display order
                    })
                    indexOfUser++
                  }

                  userData.value = tmpUserData.sort(function (a, b) {
                    return a.index - b.index
                  })
                  status.value = 'ready'
                })
                .catch((error) => {
                  store.add({
                    type: 'error',
                    title: 'Fetching users failed:',
                    message: error.message,
                  })
                })
            } else {
              serviceOveruse(response.rate.reset)
            }
          })
          .catch((error) => {
            store.add({
              type: 'error',
              title: 'Fetching contributors failed:',
              message: error.message,
            })
          })
      } else {
        serviceOveruse(response.rate.reset)
      }
    })
    .catch((error) => {
      store.add({
        type: 'error',
        title: 'GitHub get rate limit error:',
        message: error.message,
      })
    })
})
function serviceOveruse(reset) {
  const d = new Date(reset * 1000)
  const time = Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(d)
  resetTime = time
  status.value = 'overuse'
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
