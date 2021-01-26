<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <h3 id="api_reference">API Reference</h3>
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
        <h3 id="user_guide">User Guides</h3>
        <ul>
          <li
            v-for="(version, index) in tutorialVersions"
            :key="'guide_' + index"
          >
            <router-link :to="{ path: `documentation/guides/${version}` }">
              libCellML User Guide {{ version }} 
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
  name: 'DocumentationContent',

  data: () => {
    return { apiVersions: [], tutorialVersions: [] }
  },
  created() {
    this.apiVersions = getDoxygenVersions()
    this.tutorialVersions = getSphinxVersions()
  },
}
</script>
