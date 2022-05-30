<template>
  <v-row id="dropdown-id">
    <v-col @click="expandDropdown" class="breadcrumb-dropdown">
      <v-icon size="1.1em">mdi-chevron-down</v-icon>
    </v-col>
  </v-row>
  <div
    class="dropdown-blocker"
    :class="optionsState"
    @click="collapseDropdown"
  ></div>
  <v-row :class="optionsState" @click="collapseDropdown">
    <v-col>
      <template
        v-for="(version, index) in versionChoices"
        :key="'version_index_' + index"
      >
        <span v-if="version === store.state.current_documentation_version">
          {{ version }}
          <v-icon size="1em">mdi-check</v-icon>
        </span>
        <router-link
          v-else
          :id="'version_' + version"
          :to="getRouteForVersion(version)"
          @click="updateCurrentVersion(version)"
        >
          {{ version }}
        </router-link>
        <br />
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { changeRouteVersion } from '../router'

const router = useRouter()
const store = useStore()

let optionsState = ref('hide-options')

function expandDropdown() {
  optionsState.value = 'show-options'
}

function collapseDropdown() {
  optionsState.value = 'hide-options'
}

function getRouteForVersion(version) {
  const currentRoute = router.currentRoute.value
  let changedRoute = { path: '/' }
  // Some 'routes' received here are not proper routes but breadcrumb link routes.
  // We will ignore those routes.
  if (
    currentRoute.path &&
    currentRoute.fullPath &&
    currentRoute.href &&
    currentRoute.params &&
    currentRoute.params.version
  ) {
    changedRoute = changeRouteVersion(currentRoute, version)
  }
  return changedRoute
}

function updateCurrentVersion(version) {
  store.commit('setCurrentDocumentationVersion', version)
}

const props = defineProps({
  versionChoices: {
    type: Array,
    default: () => {
      return []
    },
  },
})

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

.dropdown-blocker {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: ' ';
  background: rgba(0, 0, 0, 0.5);
}
</style>
