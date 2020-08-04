<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Tutorials</h1>
        <ul>
          <li
            v-for="(version, index) in tutorialVersions"
            :key="'api_reference_' + index"
          >
            <router-link :to="{ path: `/help/tutorials/${version}` }">
              <big>libCellML {{ version }} Tutorials</big>
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getSphinxVersions } from '@/js/versions'

export default {
  name: 'HelpTutorials',
  data: () => {
    return { tutorialVersions: [] }
  },
  created() {
    this.tutorialVersions = getSphinxVersions()
  },
}
</script>
