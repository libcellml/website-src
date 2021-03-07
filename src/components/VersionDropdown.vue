<template>
  <v-container>
    <v-row id="dropdown-id">
      <v-col @click="expandDropdown" class="breadcrumb-dropdown">
        <v-icon size="1.1em">mdi-chevron-down</v-icon>
      </v-col>
    </v-row>
    <v-row class="hide-options">
      <template v-for="(version, index) in versionChoices">
        <router-link
          :key="'version_index_' + index"
          :id="'version_' + version"
          :to="{ path: `/documentation/${versionType}/${version}${pagePath}` }"
        >
          {{ version }}
        </router-link>
        <template v-if="version === currentVersion">
          <v-icon :key="'version_tick' + version" size="1em">mdi-check</v-icon>
        </template>
        <br :key="'_' + index" />
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { getApiVersions, getUserGuidesVersions } from '../js/versions'

export default {
  name: 'VersionDropdown',
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
  mounted() {
    if (
      (this.$props.versionType === 'guides' &&
        this.$props.currentVersion !== getUserGuidesVersions()[0]) ||
      (this.$props.versionType === 'api' &&
        this.$props.currentVersion !== getApiVersions()[0])
    ) {
      let b = document.getElementById('dropdown-id')
      b.classList = ['old-version']
    }
  },

  methods: {
    expandDropdown() {
      let menu = document.getElementById('dropdown-id')
      document.addEventListener('click', function(event) {
        var isClickInside = menu.contains(event.target)
        if (!isClickInside) {
          menu.nextSibling.classList = ['hide-options']
        }
      })
      this.$el.lastElementChild.classList = ['show-options']
    },
  },
  computed: {
    pagePath() {
      return this.$route.fullPath.split(`${this.$route.params.version}`)[1]
    },
  },
}
</script>

<style scoped>
.breadcrumb-dropdown {
  position: relative;
  color: var(--link-colour);
  font-size: normal;
}

.hide-options {
  display: none;
  position: absolute;
}

.show-options {
  display: inline-block;
  position: absolute;
  background-color: white;
  z-index: 1;
  padding: 0.8em 1em;
  border: solid 0.1em var(--border-colour);
  border-top: none;
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
}

.show-options a {
  text-decoration: none;
}

.show-options a:hover {
  text-decoration-line: var(--link-decoration-line);
  text-decoration-style: var(--link-decoration-style);
  text-decoration-color: var(--link-underline-colour);
  text-underline-offset: 0.2em;
  text-decoration-thickness: 3px;
  text-decoration-color: var(--bright-red) !important;
}

.old-version {
  background-color: var(--warning-background);
}

#dropdown-id {
  font-weight: 500;
  border-radius: 0.2em;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  padding: 0 0.1em;
  margin: 0 0.1em;
}
</style>
