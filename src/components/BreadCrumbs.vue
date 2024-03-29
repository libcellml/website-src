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
      <v-breadcrumbs :items="store.breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:title="{ item }">
          <!-- Dropdown in the breadcrumbs menu: -->
          <v-breadcrumbs-item v-if="item.versionChoice">
            <v-select
              :model-value="store.current_documentation_version"
              @update:model-value="updateCurrentVersion($event)"
              :items="alternativeVersions"
              item-title="text"
              item-value="text"
              label="Select"
              return-object
              single-line
              density="compact"
              hide-details="true"
              variant="solo"
            >
            </v-select>
          </v-breadcrumbs-item>
          <!-- Normal item, no dropdown, formed from named page: -->
          <v-breadcrumbs-item v-else :to="defineBreadcrumbTarget(item.target)">
            <template v-if="item.text === 'Home'">
              <v-icon size="1.3em">mdi-home</v-icon>
            </template>
            <template v-else>
              {{ item.text }}
            </template>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useSiteStore } from '@/stores/site'
import { getDocumentationVersions } from '@/js/documentationversions'
import { versionedRouteNames, changeRouteVersion } from '@/router'

const store = useSiteStore()
const route = useRoute()
const router = useRouter()

const latest = getDocumentationVersions()[0]

const viewingOldDocumentation = computed(() => {
  if (
    versionedRouteNames.includes(route.name) &&
    store.current_documentation_version !== latest
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
    if (version !== store.current_documentation_version) {
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

function defineBreadcrumbTarget(target) {
  if (target === '') {
    return {}
  }
  return target
}

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
  router.push(getRouteForVersion(latest))
  store.setCurrentDocumentationVersion(latest)
}

function updateCurrentVersion(version) {
  router.push(getRouteForVersion(version.text))
  store.setCurrentDocumentationVersion(version.text)
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
