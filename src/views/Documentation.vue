<template>
  <v-container>
    <v-row>
      <v-col>
        <DocumentationContent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DocumentationContent from '@/components/DocumentationContent.vue'
import { getDoxygenVersions, getSphinxVersions } from '@/js/versions'

export default {
  name: 'DocumentationPage',
  components: {
    DocumentationContent,
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
