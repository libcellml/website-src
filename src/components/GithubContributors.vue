<template>
  <v-container>
    <!-- Option 3: Names in combined list -->
    <ul v-for="person in allContributors" :key="`person-${person.user}`">
      <li>{{ person.user_data.name }}</li>
      <li>
        <!-- {{ person.user_data.avatar_url }} -->
        <img :src="person.user_data.avatar_url" class="avatar" />
      </li>
    </ul>

    <!-- OPTION 2: Names in separate lists -->
    <!-- <v-row>
      <v-col class="col-12 col-md-4">
        <h4>libCellML contributors</h4>
        <ul
          v-for="person in libcellmlContributors"
          :key="`person-id-${person.id}`"
        >
          <li>{{ person.login }} ({{ person.contributions }})</li>
        </ul>
      </v-col>

      <v-col class="col-12 col-md-4">
        <h4>Website contributors</h4>
        <ul
          v-for="person in websiteContributors"
          :key="`person-id-${person.id}`"
        >
          <li>{{ person.login }} ({{ person.contributions }})</li>
        </ul>
      </v-col>

      <v-col class="col-12 col-md-4">
        <h4>Tutorial contributors</h4>
        <ul
          v-for="person in tutorialsContributors"
          :key="`person-id-${person.id}`"
        >
          <li>{{ person.login }} ({{ person.contributions }})</li>
        </ul>
      </v-col>
    </v-row> -->

    <!-- OPTION 1: Avatars -->
    <!-- <v-row>
      <v-col
        v-for="person in allContributors"
        :key="`person-id-${person.user}`"
        class="col-1"
      > -->
    <!-- <v-avatar> -->
    <!-- <img :src="person.data.user_data.avatar_url" class="avatar" /> -->
    <!-- </v-avatar> -->
    <!-- {{person.data.user_data}}
      </v-col>
    </v-row> -->
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
    // contributors: {},
  }),
  mounted: function () {
    // setTimeout(() => {
    repos.forEach((r) => {
      this.GitHubAPI.get(
        '/repos/' + r.org + '/' + r.repo + '/contributors',
        {},
        [this.repo_data, r.org + '_' + r.repo],
      )
    })

    //   const data = { ...this.repo_data }

    //   let users = []

    //   repos.forEach((r) => {
    //     let key = r.org + '_' + r.repo
    //     if (data[key] !== undefined) {
    //       data[key].forEach((u) => {
    //         if (!u.login.includes(skipUser)) {
    //           users.push(u.login)
    //         }
    //       })
    //     }
    //   })

    //   let uniqueUsers = new Set(users)

    //   uniqueUsers.forEach((u) => {
    //     let person = {}
    //     person.user = u
    //     person.repos = []

    //     this.GitHubAPI.get('/users/' + u, {}, [person, 'user_data'])

    //     console.log('person = ')
    //     console.log(person)
    //     this.contributors.push(person)
    //   })

    //   console.log(this.contributors)
    // }, this.$store.getters.getTransitionDelay)
  },

  computed: {
    allContributors() {
      // return this.contributors
      const data = { ...this.repo_data }

      let users = []
      if (Object.keys(data).length == repos.length) {
        repos.forEach((r) => {
          let key = r.org + '_' + r.repo
          data[key].forEach((u) => {
            if (!u.login.includes(skipUser)) {
              users.push(u.login)
            }
          })
        })

        let uniqueUsers = new Set(users)
        let userInfo = []

        uniqueUsers.forEach((u) => {
          let person = {}
          person.user = u
          person.repos = []

          // let temp = {}
          this.GitHubAPI.get('/users/' + u, {}, [person, 'user_data'])

          //     // const userData = { ...temp.user_data }
          //     // const userData = JSON.parse(JSON.stringify( temp.user_data ))
          //     // const userData = Object.assign({}, temp)
          //     // person.data = userData
          //     // console.log("temp = ")
          //     // console.log(temp)
          //     // console.log("userData = ")
          //     // console.log(userData)
          //     // person.data = userData

          repos.forEach((r) => {
            const repoKey = r.org + '_' + r.repo
            const userInRepo = data[repoKey].filter(function (el) {
              return el.login === u
            })
            if (userInRepo.length > 0) {
              person.repos.push(r.name)
            }
          })
          console.log('person = ')
          console.log(person)
          userInfo.push(person)
        })

        return userInfo
      }

      return []
    },
    // allContributors() {
    //   // const c1 = this.contributors.libcellml
    //   // const c2 = this.contributors.website_src
    //   // const c3 = this.contributors.libcellml_tutorials
    //   // console.log(c1)
    //   // console.log(c2)
    //   // console.log(c3)

    //   // let users = c1 + c2 + c3
    //   // .map((a) => a.login)
    //   alert(users)
    //   console.log(users)
    //   let userInfo = []
    //   let info = {}

    //   // combining info for duplicated user names
    //   users.forEach((user) => {
    //     this.GitHubAPI.get('users/' + user, {}, [info, 'names'])
    //     userInfo.push({
    //       contributions:
    //         c1[user].contributions +
    //         c2[user].contributions +
    //         c3[user].contributions,
    //       name: info.name,
    //       login: user,
    //     })
    //   })

    //   // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
    //   // Make a list by combining all repositories, then re-order the dict according to the totals.
    //   return userInfo
    // },
  },
}
</script>

<style scoped>
.avatar {
  width: 5rem;
  border-radius: 50%;
}
ul {
  list-style-type: none;
}
li::before {
  content: '- ';
}
</style>
