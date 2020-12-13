<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <div class="version-box">
            <version-combo-box
              :versions="availableVersions"
            ></version-combo-box>
          </div>
          <sphinx-page
            :baseURL="`/data/sphinx/${$route.params.version}`"
            indexFileName="index"
            @updated="updated"
          ></sphinx-page>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'
import VersionComboBox from '@/components/VersionComboBox'

import { getSphinxVersions } from '@/js/versions'

import ui from '@/js/ui'

export default {
  name: 'TutorialsPage',
  components: {
    SphinxPage,
    VersionComboBox,
  },

  computed: {
    availableVersions() {
      return getSphinxVersions()
    },
  },

  methods: {
    updated() {
      this.$store.commit('togglePageContentChanged')

      // KRM include these on any page where the injected XML might contain tabs or toggle blocks.
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
