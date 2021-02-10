<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-md-4">
        <v-btn block :class="'big-button'" to="/documentation/api">
          <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon>
          <br />
          API Documentation
        </v-btn>
        <div>
          <br />
          <ul>
            <li
              v-for="(version, index) in apiVersions"
              :key="'api_reference_' + index"
            >
              <router-link :to="{ path: `documentation/api/${version}` }">
                API Documentation {{ version }}
              </router-link>
            </li>
          </ul>
        </div>
      </v-col>

      <v-col class="col-12 col-md-4">
        <v-btn block :class="'big-button'" to="/documentation/guides">
          <v-icon color="white" x-large>mdi-account-group</v-icon>
          <br />
          Users' Guides
        </v-btn>
        <div>
          <br />
          <ul>
            <li
              v-for="(version, index) in tutorialVersions"
              :key="'guide_' + index"
            >
              <router-link :to="{ path: `documentation/guides/${version}` }">
                Users' Guides {{ version }}
              </router-link>
            </li>
          </ul>
        </div>
      </v-col>

      <v-col class="col-12 col-md-4">
        <v-btn block :class="'big-button'">
          <v-icon color="white" x-large>mdi-cogs</v-icon>
          <br />
          Developers' Guides
        </v-btn>
        <div>
          <br />
          <ul>
            <li v-for="(version, index) in devVersions" :key="'guide_' + index">
              <router-link
                :to="{ path: `documentation/developers/${version}` }"
              >
                Developers' Guides {{ version }}
              </router-link>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getDoxygenVersions,
  getSphinxVersions,
  getDevelopersVersions,
} from '@/js/versions'

export default {
  name: 'DocumentationArchive',

  data: () => {
    return { apiVersions: [], tutorialVersions: [] }
  },
  created() {
    this.apiVersions = getDoxygenVersions()
    this.tutorialVersions = getSphinxVersions()
    this.devVersions = getDevelopersVersions()
  },
}
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
