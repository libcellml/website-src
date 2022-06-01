<template>
  <v-row v-if="viewingOldDocumentation" class="old-version">
    <v-col>
      <router-link :to="getRouteToLatestVersion" @click="onViewLatest">
        You are viewing an old version. Click here to see the latest
      </router-link>
      <v-icon size="1.3em">mdi-alert-circle-outline</v-icon>
    </v-col>
  </v-row>
  <v-row class="flex float-left breadcrumb-bar">
    <v-col>
      <v-breadcrumbs :items="store.getters.getBreadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>

        <template v-slot:text="{ item }">
          <!-- Dropdown in the breadcrumbs menu: -->
          <template v-if="item.versionChoice">
            <!-- I would prefer this to be a v-select based element but that doesn't behave very well as a breadcrumb item. -->
            <v-breadcrumbs-item>
              <v-menu transition="scroll-y-transition">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    class="ma-2"
                    v-bind="props"
                    variant="outlined"
                  >
                    {{ store.state.current_documentation_version }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="v of alternativeVersions"
                    :key="v"
                    :to="v.to"
                    @click="updateCurrentVersion(v.text)"
                  >
                    <v-list-item-title v-text="v.text"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-breadcrumbs-item>
          </template>

          <!-- Normal item, no dropdown, formed from named page: -->
          <template v-else>
            <v-breadcrumbs-item
              :exact="true"
              :to="item.to"
              :disabled="item.disabled"
            >
              <template v-if="item.text === 'Home'">
                <v-icon size="1.3em">mdi-home</v-icon>
              </template>
              <template v-else>
                {{ item.text }}
              </template>
            </v-breadcrumbs-item>
          </template>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { getDocumentationVersions } from '../js/versions'
import { versionedRoutes, changeRouteVersion } from '../router'

const store = useStore()
const route = useRoute()

const latest = getDocumentationVersions()[0]

const viewingOldDocumentation = computed(() => {
  if (
    versionedRoutes.includes(route.name) &&
    store.state.current_documentation_version !== latest
  ) {
    return true
  }
  return false
})

const getRouteToLatestVersion = computed(() => {
  if (viewingOldDocumentation) {
    return changeRouteVersion(route, latest)
  }

  return { name: 'Home' }
})

const alternativeVersions = computed(() => {
  let versionList = []
  for (const version of getDocumentationVersions()) {
    if (version !== store.state.current_documentation_version) {
      versionList.push({
        to: getRouteForVersion(version),
        text: version,
      })
    }
  }
  if (versionList.length === 0) {
    versionList.push({
      to: '',
      text: 'No other versions available.',
    })
  }

  return versionList
})
const currentVersion = computed({
  get() {
    return store.state.current_documentation_version
  },
  set(val) {
    store.state.current_documentation_version = val
  },
})

function getRouteForVersion(version) {
  const currentRoute = route
  let changedRoute = { path: '/' }
  // Some 'routes' received here are not proper routes but breadcrumb link routes.
  // We will ignore those routes.
  if (
    currentRoute.path &&
    currentRoute.fullPath &&
    currentRoute.params &&
    currentRoute.params.version
  ) {
    changedRoute = changeRouteVersion(currentRoute, version)
  }
  return changedRoute
}

function onViewLatest() {
  store.commit('setCurrentDocumentationVersion', latest)
}

function updateCurrentVersion(version) {
  store.commit('setCurrentDocumentationVersion', version)
}
</script>

<style scoped>
.old-version {
  color: var(--link-colour);
  background-color: var(--warning-background);
  padding: 0.3rem 1rem 0.3rem 0.6rem;
  border-radius: 0.2em;
  font-weight: 500;
  cursor: pointer;
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
