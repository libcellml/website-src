<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Documentation</h1>
        <v-row>
          <v-col class="col-12 col-md-4">
            <v-btn class="feature-btn" outlined to="documentation/api/latest"
              ><v-icon>$vuetify.icons.apidocumentation</v-icon></v-btn
            >
          </v-col>
          <v-col class="col-12 col-md-4">
            <v-btn class="feature-btn" outlined to="documentation/guides/latest"
              ><v-icon>$vuetify.icons.userguides</v-icon></v-btn
            >
          </v-col>
          <v-col class="col-12 col-md-4">
            <v-btn class="feature-btn" outlined
              ><v-icon>$vuetify.icons.developerguides</v-icon></v-btn
            >
          </v-col>
        </v-row>

        <h3 id="documentation_older_versions">Older versions</h3>
        <p>
          For older versions see the
          <router-link to="documentation/">
            documentation page
          </router-link>
          .
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'

export default {
  name: 'DocumentationContent',

  // data: () => {
  //   return { apiVersions: [], tutorialVersions: [] }
  // },
  // created() {
  //   this.apiVersions = getDoxygenVersions()
  //   this.tutorialVersions = getSphinxVersions()
  // },
}
</script>

<style scoped>
.feature-btn {
  height: fit-content !important;
  width: 100%;
  padding: 1rem 1rem !important;
}
</style>
