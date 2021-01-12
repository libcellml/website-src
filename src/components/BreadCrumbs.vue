<template>
  <div class="breadcrumbs" id="breadcrumbs">
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>

          <template v-slot:item="{ item }">
            <v-breadcrumbs-item 
              :href="item.href" 
              :disabled="item.disabled">
              <template v-if="item.text === 'home'">
                <v-icon size="1.3em">mdi-home</v-icon>
              </template>
              <template v-else-if="item.type === 'versions'">
                <VersionDropdown
                  :versionChoices="versionChoices"
                  :currentVersion="currentVersion"
                  :versionType="versionType"
                />
              </template>
              <template v-else>
                {{ item.text.toUpperCase() }}
              </template>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getDoxygenVersions, getSphinxVersions } from '../js/versions'
import VersionDropdown from './VersionDropdown'

export default {
  name: 'BreadCrumbs',
  components: {
    VersionDropdown,
  },
  props: {
    currentVersion: {
      type: String,
      default: '',
    },
    versionChoices: {
      type: Array,
      default: () => {
        return []
      },
    },
    versionType: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    items: [],
  }),
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
  },
}
</script>
<style scoped></style>
