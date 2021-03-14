<template>
  <div class="breadcrumbs" id="breadcrumbs">
    <v-container>
      <template v-if="currentVersion && currentVersion !== latest">
        <div class="old-version">
          <router-link :to="{ path: `${latestFullPath}` }">
            You are viewing an old version. Click to see the latest one
          </router-link>
          <v-icon size="1.3em">mdi-alert-circle-outline</v-icon>
        </div>
      </template>
      <v-row class="flex float-left">
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>

          <template v-slot:item="{ item }">
            <!-- Dropdown in the breadcrumbs menu: -->
            <template v-if="item.type === 'versionSelector'">
              <VersionDropdown
                :versionChoices="versionChoices"
                :currentVersion="currentVersion"
                :versionType="versionType"
              /><v-breadcrumbs-item
                :to="{ name: item.name, hash: item.hash, params: item.params }"
                :disabled="item.disabled"
                :exact="true"
                :style="'padding-right: 0;'"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>

            <!-- Normal item, no dropdown, formed from named page: -->
            <template v-else-if="item.type === 'pageFromName'">
              <v-breadcrumbs-item
                :exact="true"
                :to="{ name: item.name, hash: item.hash, params: item.params }"
                :disabled="item.disabled"
              >
                <template v-if="item.text === 'HOME'">
                  <v-icon size="1.3em">mdi-home</v-icon>
                </template>
                <template v-else>
                  {{ item.text }}
                </template>
              </v-breadcrumbs-item>
            </template>

            <!-- Normal item, no dropdown, formed from path to page: -->
            <template v-else>
              <v-breadcrumbs-item
                :exact="true"
                :to="{ path: item.path }"
                :disabled="false"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </template>
        </v-breadcrumbs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VersionDropdown from './VersionDropdown'
import {
  getApiVersions,
  getUserGuidesVersions,
  getDevelopersVersions,
} from '../js/versions'

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
    version: '',
  }),

  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
    latest() {
      if (this.$props.versionType === 'guides') {
        return getUserGuidesVersions()[0]
      } else if (this.$props.versionType === 'developers') {
        return getDevelopersVersions()[0]
      }
      return getApiVersions()[0]
    },
    latestFullPath() {
      return this.$route.fullPath.replace(
        `${this.$route.params.version}`,
        this.latest,
      )
    },
  },
}
</script>

<style scoped>
.old-version {
  color: var(--link-colour);
  background-color: var(--warning-background);
  padding: 0.3rem 1rem 0.3rem 0.6rem;
  border-radius: 0.2em;
  font-weight: 500;
}
.old-version * {
  text-decoration: none;
}
.old-version a:hover {
  text-decoration-line: var(--link-decoration-line);
  text-decoration-style: var(--link-decoration-style);
  text-decoration-color: var(--link-underline-colour);
  text-underline-offset: 0.2em;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--bright-red);
}
</style>
