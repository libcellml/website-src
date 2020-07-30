<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <h2>API Reference</h2>
        <ul>
          <li
            v-for="(version, index) in versions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `help/api/${version}` }">
              <big>libCellML {{ version }} API Documentation</big>
            </router-link>
          </li>
        </ul>
        <h2>Tutorials</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Documentation',

  data: () => {
    return { versions: [] }
  },
  created() {
    this.getVersions().then(response => {
      this.versions = response
    })
  },
  methods: mapActions('doxygen', ['getVersions']),
}
</script>
