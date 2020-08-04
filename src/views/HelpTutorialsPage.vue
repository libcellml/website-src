<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <div class="absolute-box">
            <version-combo-box
              :versions="availableVersions"
            ></version-combo-box>
          </div>
          <sphinx-page
            :baseURL="`/data/sphinx/${$route.params.version}`"
            indexFileName="tutorials_index"
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
    },
  },
}
</script>

<style scoped>
.tutorials {
  position: relative;
}

.absolute-box {
  position: absolute;
  top: 0;
}
</style>
