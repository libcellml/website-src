<template>
  <div class="documentation">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <h1>libCellML Documentation and Guides</h1>
          <DocumentationComplete />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DocumentationComplete from '@/components/DocumentationComplete.vue'
import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'
import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'DocumentationPage',
  components: {
    DocumentationComplete,
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
ul > li {
  list-style-type: none;
}
</style>
