<template>
  <v-container>
    <h4>libCellML contributors</h4>
    <v-row>
      <v-col
        v-for="person in libcellmlContributors"
        :key="`person-id-${person.id}`"
      >
        <img :src="person.avatar_url" class="avatar"/> <br/>
      </v-col>
    </v-row>

    <h4>Website contributors</h4>
    <v-row>
      <v-col
        v-for="person in websiteContributors"
        :key="`person-id-${person.id}`"
      >
        <img :src="person.avatar_url" class="avatar"/> <br/>
      </v-col>
    </v-row>

    <h4>Tutorial contributors</h4>
    <v-row>
      <v-col
        v-for="person in tutorialsContributors"
        :key="`person-id-${person.id}`"
      >
        <img :src="person.avatar_url" class="avatar"/> <br/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'GithubContributors',
  data: () => ({
    contributors: {},
  }),
  mounted: function () {
    this.GitHubAPI.get('/repos/cellml/libcellml/contributors', {}, [
      this.contributors,
      'libcellml',
    ])
    this.GitHubAPI.get('/repos/libcellml/website-src/contributors', {}, [
      this.contributors,
      'website_src',
    ])
    // KRM Move tutorials repo to libcellml? or cellml?
    this.GitHubAPI.get(
      '/repos/kerimoyle/libcellml-tutorials/contributors',
      {},
      [this.contributors, 'libcellml_tutorials'],
    )
  },

  computed: {
    libcellmlContributors() {
      return this.contributors.libcellml
    },
    websiteContributors() {
      return this.contributors.website_src
    },
    tutorialsContributors() {
      return this.contributors.libcellml_tutorials
    },
  },
}
</script>

<style scoped>
.avatar {
  width: 5rem;
  border-radius: 50%;
}
</style>
