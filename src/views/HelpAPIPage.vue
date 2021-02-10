<template>
  <div class="api-reference">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs
            v-bind:versionChoices="getVersions()"
            :currentVersion="`${$route.params.version}`"
            :versionType="'api'"
          />
          <DoxygenXml
            :baseURL="`/data/doxygen/${$route.params.version}`"
            @updated="updated"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DoxygenXml } from 'vue-doxygen-xml'
import BreadCrumbs from '@/components/BreadCrumbs'
import { getDoxygenVersions } from '../js/versions'
import ui from '@/js/ui'

export default {
  name: 'APIPage',
  components: {
    DoxygenXml,
    BreadCrumbs,
  },
  mounted() {
    setTimeout(function() {
      let urlParams = new URLSearchParams(window.location.search)
      let fName = urlParams.get('fName')
      ui.goToSignature(fName)
    }, this.$store.getters.getTransitionDelay)
  },
  watch: {
    $route() {
      setTimeout(function() {
        let urlParams = new URLSearchParams(window.location.search)
        let fName = urlParams.get('fName')
        ui.goToSignature(fName)
      }, this.$store.getters.getTransitionDelay)
    },
  },
  methods: {
    getVersions() {
      return getDoxygenVersions()
    },
    updated() {
      this.$store.commit('togglePageContentChanged')
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
<style src="../css/doxygen.css"></style>
