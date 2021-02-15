<template>
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs
            v-bind:versionChoices="getVersions()"
            :currentVersion="`${$route.params.version}`"
            :versionType="'guides'"
          />
          <SphinxPage
            :baseURL="`/data/userguides/${this.$route.params.version}`"
            :version="`${$route.params.version}`"
            @updated="updated"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getUserGuidesVersions } from '../js/versions'

import ui from '@/js/ui'

export default {
  name: 'TutorialsHome',
  components: {
    SphinxPage,
    BreadCrumbs,
  },
  computed: {
    versionPath() {
      return this.$route.params.version
    },
  },

  methods: {
    getVersions() {
      return getUserGuidesVersions()
    },
    updated() {
      this.$store.commit('togglePageContentChanged')

      // KRM include these on any page where the injected XML might contain tabs or toggle blocks.
      // Workaround only until sphinx tabs and toggles cann be handled outside the browser properly.
      setTimeout(function () {
        ui.processSphinxTabs()
        ui.addClickHandlerTabs()
        ui.addClickHandlerToggles()
      }, this.$store.getters.getTransitionDelay)
    },
  },
}
</script>

<style scoped>
.api-reference {
  position: relative;
}
.version-box > * {
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
<style src="../css/sphinx.css"></style>
