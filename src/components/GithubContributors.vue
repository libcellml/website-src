<template>
  <v-container>
    <!-- Option 3: Names in combined list -->
    <!-- <ul v-for="person in allContributors" :key="`person-${person.login}`">
      <li>{{ person }}</li>
      <li>
        {{ person.user_data }}
         <img :src="person.user_data.avatar_url" class="avatar" /> 
      </li>
    </ul> -->

    <!-- OPTION 1: Avatars -->
    <v-row>
      <v-col
        v-for="person in allContributors"
        :key="`person-id-${person.login}`"
        class="col-1"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <a v-on="on" :href="person.url" target="_blank">
              <v-avatar>
                <img :src="person.avatar_url" :alt="person.name" />
              </v-avatar>
            </a>
          </template>
          <span>
            <strong>{{ person.name }}</strong> contributes to:
            <ul
              v-for="repo in person.repos"
              :key="`person-${person.login}_${repo}`"
            >
              <li>{{ repo }}</li>
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
    repo_data: {},
    user_data: {},
  }),
  mounted: function () {
    function githubGetContributors(org, repo) {
      let p = new Promise(function (pResolve, pReject) {
        let req = new XMLHttpRequest()
        let url =
          'https://api.github.com/repos/' + org + '/' + repo + '/contributors'
        req.open('GET', url)
        req.onload = function () {
          if (req.status == 200) {
            pResolve(req.response)
          } else {
            pReject("Oops, can't access repository: " + org + '/' + repo)
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
        req.onload = function () {
          if (req.status == 200) {
            pResolve(req.response)
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
            console.log("Skipping ", user)
            continue
          } else if (users[user]) {
            users[user].repos.push(repos[v])
          } else {
            users[user] = { login: user, repos: [repos[v],] }
          }
        }
      }
      console.log("users: ",users)

      // let users = []
      // for (var v in values) {
      //   let temp = JSON.parse(values[v])
      //   for (let u in temp) {
      //     users.push(temp[u].login)
      //   }
      // }
      // let uniqueUsers = [...new Set(users)]
      // function notBot(user) {
      //   return !user.includes(skipUser)
      // }
      // uniqueUsers = uniqueUsers.filter(notBot)

      let fetchUsers = []
      for (let u in users) {
        fetchUsers.push(githubGetUser(users[u]))
      }

      Promise.all(fetchUsers).then((userDataArray) => {
        let userData = []
        for (let u in userDataArray) {
          let tempUser = JSON.parse(userDataArray[u])
          userData.push({
            name: tempUser.name,
            login: tempUser.login,
            avatar_url: tempUser.avatar_url,
            url: tempUser.html_url,
          })
        }
        this.user_data = userData
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
.avatar {
  max-width: 4rem;
  border-radius: 50%;
}
.avatar_name {
  /* max-width: 4rem; */
  text-align: center;
}
.avatar_card {
  padding: 0.5rem;
}
</style>
