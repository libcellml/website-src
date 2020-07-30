<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <h2>API Reference</h2>
        <ul>
          <li
            v-for="(version, index) in apiVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `help/api/${version}` }">
              <big>libCellML {{ version }} API Documentation</big>
            </router-link>
          </li>
        </ul>
        <h2>Tutorials</h2>
        <ul>
          <li
            v-for="(version, index) in tutorialVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `help/tutorials/${version}` }">
              <big>libCellML {{ version }} Tutorials</big>
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'

export default {
  name: 'Documentation',

  data: () => {
    return { apiVersions: [], tutorialVersions: [] }
  },
  created() {
    this.apiVersions = getDoxygenVersions()
    this.tutorialVersions = getSphinxVersions()
  },
}
</script>
