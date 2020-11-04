<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <router-link :to="{ path: 'documentation/api' }"
          ><h2 id="api_reference">API Reference</h2></router-link
        >
        <ul>
          <li
            v-for="(version, index) in apiVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `documentation/api/${version}` }">
              <big>libCellML {{ version }} API Documentation</big>
            </router-link>
          </li>
        </ul>
        <router-link :to="{ path: 'documentation/tutorials' }"
          ><h2 id="tutorials">Tutorials</h2></router-link
        >
        <ul>
          <li
            v-for="(version, index) in tutorialVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `documentation/tutorials/${version}` }">
              <big>libCellML {{ version }} Tutorials</big>
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
