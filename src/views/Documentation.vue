<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <!-- <router-link :to="{ path: 'documentation/api' }"
          ><h2 id="api_reference"> -->
        <h3>API Reference</h3>
        <!-- </h2></router-link> -->
        <ul>
          <li
            v-for="(version, index) in apiVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `documentation/api/${version}` }">
              libCellML {{ version }} API Documentation
            </router-link>
          </li>
        </ul>
        <!-- <router-link :to="{ path: 'documentation/tutorials' }"
          > -->
        <br />
        <h3 id="tutorials">Tutorials</h3>
        <!-- </router-link> -->
        <ul>
          <li
            v-for="(version, index) in tutorialVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `documentation/tutorials/${version}` }">
              libCellML Tutorials {{ version }}
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Documentation from '@/components/Documentation.vue'
import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'

export default {
  name: 'DocumentationPage',
  // components: {
  //   Documentation,
  // },
  data: () => {
    return { apiVersions: [], tutorialVersions: [] }
  },
  created() {
    this.apiVersions = getDoxygenVersions()
    this.tutorialVersions = getSphinxVersions()
  },
}
</script>
<style scoped>
ul > li {
  list-style-type: none;
}
</style>
