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
            <version-dropdown
              :versionChoices="getDocumentationVersions()"
            /><v-breadcrumbs-item
              :to="item.to"
              :disabled="item.disabled"
              :exact="true"
              :style="'padding-right: 0;'"
            >
              {{ item.text }}
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
import { useRouter } from 'vue-router'

import VersionDropdown from './VersionDropdown.vue'
import { getDocumentationVersions } from '../js/versions'
import { versionedRoutes, changeRouteVersion } from '../router'

const store = useStore()
const router = useRouter()

const latest = getDocumentationVersions()[0]

const viewingOldDocumentation = computed(() => {
  if (
    versionedRoutes.includes(router.currentRoute.value.name) &&
    store.state.current_documentation_version !== latest
  ) {
    return true
  }
  return false
})

const getRouteToLatestVersion = computed(() => {
  if (viewingOldDocumentation) {
    const currentRoute = router.currentRoute.value
    return changeRouteVersion(currentRoute, latest)
  }

  return { name: 'Home' }
})

function onViewLatest() {
  store.commit('setCurrentDocumentationVersion', latest)
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
