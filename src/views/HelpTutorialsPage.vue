<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs
            v-bind:versionChoices="getVersions()"
            :currentVersion="`${$route.params.version}`"
            :versionType="'guides'"
          />

          <SphinxPage
            :baseURL="`/data/userguides/${$route.params.version}`"
            indexFileName="index"
            @updated="updated"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getUserGuidesVersions } from '../js/versions'

import ui from '@/js/ui'

export default {
  name: 'TutorialsPage',
  components: {
    SphinxPage,
    BreadCrumbs,
  },

  mounted() {
    // KRM include these on any page where the injected XML might contain tabs or toggle blocks.
    // Workaround only until sphinx tabs and toggles cann be handled outside the browser properly.
    setTimeout(function() {
      ui.processSphinxTabs()
      ui.addClickHandlerTabs()
      ui.addClickHandlerToggles()
      ui.getFigureCaptions()
    }, this.$store.getters.getTransitionDelay+200)

    setTimeout(function() {
      let urlParams = new URLSearchParams(window.location.search)
      let fName = urlParams.get('issue')
      ui.goToSignature('issue-code',fName, '')
    }, this.$store.getters.getTransitionDelay)
  },

  methods: {
    getVersions() {
      return getUserGuidesVersions()
    },
    updated() {
      this.$store.commit('togglePageContentChanged')
    },
  },

  watch: {
    $route() {
      setTimeout(function() {
        let urlParams = new URLSearchParams(window.location.search)
        let fName = urlParams.get('issue')
        ui.goToSignature('issue-code',fName)
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
