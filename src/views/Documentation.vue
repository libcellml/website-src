<template>
  <div class="documentation">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <h1>Archived Documentation and Guides</h1>
          <DocumentationArchive />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DocumentationArchive from '@/components/DocumentationArchive.vue'
import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'
import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'DocumentationPage',
  components: {
    DocumentationArchive,
    BreadCrumbs,
  },
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
</style>
