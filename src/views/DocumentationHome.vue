<template>
  <h1>Documentation</h1>
  <p>Documentation for {{ latest }} of libCellML.</p>
  <br />
  <documentation-buttons />
  <br />
  <h3>Previous versions of the documentation</h3>
  <br />
  <div v-for="v of olderVersions" key="'older_' + v.version">
    <h4>{{ v.version }}</h4>
    <ul style="padding-left: 2.5rem">
      <li v-if="v.haveAPI">
        <router-link :to="`/documentation/${v.version}/api`"
          >API Documentation</router-link
        >
      </li>
      <li v-if="v.haveTutorials">
        <router-link :to="`/documentation/${v.version}/tutorials`"
          >Users' Guides Documentation</router-link
        >
      </li>
      <li v-if="v.haveUser">
        <router-link :to="`/documentation/${v.version}/user`"
          >Users' Guides Documentation</router-link
        >
      </li>
      <li v-if="v.haveDeveloper">
        <router-link :to="`/documentation/${v.version}/developer`"
          >Developers Documentation</router-link
        >
      </li>
    </ul>
    <br />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useCommon } from '../composables/common'
import { getDocumentationVersions } from '../js/documentationversions'

import DocumentationButtons from '../components/DocumentationButtons.vue'

const { checkDocumentationAvailability } = useCommon()

const availableVersions = getDocumentationVersions()
const latest = availableVersions[0]

const olderVersions = ref([])

for (const version of availableVersions) {
  if (version !== latest) {
    const info = {
      version,
      haveAPI: ref(false),
      haveUser: ref(false),
      haveTutorials: ref(false),
      haveDeveloper: ref(false),
    }
    checkDocumentationAvailability(info.haveAPI, version, 'api')
    checkDocumentationAvailability(info.haveUser, version, 'user')
    checkDocumentationAvailability(info.haveTutorials, version, 'tutorials')
    checkDocumentationAvailability(info.haveDeveloper, version, 'developer')
    olderVersions.value.push(info)
  }
}
</script>
