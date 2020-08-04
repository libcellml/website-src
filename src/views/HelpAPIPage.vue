<template>
  <div class="api-reference">
    <v-container>
      <v-row>
        <v-col>
          <div class="absolute-box">
            <version-combo-box
              :versions="availableVersions"
            ></version-combo-box>
          </div>
          <doxygen-xml
            :baseURL="`/data/doxygen/${$route.params.version}`"
            @updated="updated"
          ></doxygen-xml>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DoxygenXml } from 'vue-doxygen-xml'
import VersionComboBox from '@/components/VersionComboBox'
import { getDoxygenVersions } from '@/js/versions'

export default {
  name: 'APIPage',
  components: {
    DoxygenXml,
    VersionComboBox,
  },
  computed: {
    availableVersions() {
      return getDoxygenVersions()
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
.api-reference {
  position: relative;
}
.absolute-box {
  position: absolute;
  top: 0;
}
</style>
