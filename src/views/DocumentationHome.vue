<template>
  <h1>Documentation</h1>
  <p>General documentation for all versions.</p>
  <br />
  <v-row>
    <v-col>
      <big-button
        label="Installation"
        icon-name="mdi-download"
        target="/documentation/installation"
      />
    </v-col>
    <v-col>
      <big-button
        label="Theory"
        icon-name="mdi-lightbulb-outline"
        target="/documentation/theory"
      />
    </v-col>
  </v-row>
  <br />
  <h2>Version specific documentation</h2>
  <p>
    Documentation for <strong>{{ latest }}</strong> of libCellML.
  </p>
  <br />
  <primary-documentation-buttons />
  <br />
  <v-row>
    <template v-for="i of documentationKeys" :key="'secondary_button_' + i">
      <v-col v-if="documentationInfoMap[i].level === 2 && allVersions[0][i]">
        <big-button
          :in="i"
          :label="documentationInfoMap[i].label"
          :icon-name="documentationInfoMap[i].iconName"
          :target="`/documentation/${allVersions[0].version}/${i}`"
        />
      </v-col>
    </template>
  </v-row>
  <h3>Previous versions of the documentation</h3>
  <p>
    Previous versions listed in reverse semantic versioning order. Only the most
    recent patch release for each version is available.
  </p>
  <div v-for="v of allVersions" :key="'older_' + v.version">
    <template v-if="v.version !== latest">
      <h4>{{ v.version }}</h4>
      <ul style="padding-left: 2.5rem">
        <template v-for="i of documentationKeys" :key="'list_item_' + i">
          <li v-if="v[i]">
            <router-link :to="`/documentation/${v.version}/${i}`">{{
              documentationInfoMap[i].label
            }}</router-link>
          </li>
        </template>
      </ul>
    </template>
    <br />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useCommon } from '../composables/common'
import { getDocumentationVersions } from '../js/documentationversions'

import PrimaryDocumentationButtons from '../components/PrimaryDocumentationButtons.vue'
import BigButton from '../components/BigButton.vue'

const { checkDocumentationAvailability, documentationInfoMap } = useCommon()

const availableVersions = getDocumentationVersions()
const latest = availableVersions[0]

const allVersions = ref([])
// const documentationInfoMap = {
//   api: { label: 'API Documentation', level: 1 },
//   user: { label: "Users' Guides", level: 1 },
//   tutorials: { label: 'Tutorials', level: 1 },
//   developer: { label: 'Developers Documentation', level: 1 },
//   howto: {
//     label: 'How to',
//     level: 2,
//     iconName: 'mdi-account-box-multiple-outline',
//   },
//   runtimecodes: {
//     label: 'Runtime Codes',
//     level: 2,
//     iconName: 'mdi-clipboard-text-play',
//   },
//   aside: {
//     label: 'Asides',
//     level: 2,
//     iconName: 'mdi-information',
//   },
// }

const documentationKeys = Object.keys(documentationInfoMap)

for (const version of availableVersions) {
  let possibleDocumentation = {}
  for (const value of documentationKeys) {
    possibleDocumentation[value] = ref(false)
  }
  const info = {
    version,
    ...possibleDocumentation,
  }
  for (const value of documentationKeys) {
    checkDocumentationAvailability(info[value], version, value)
  }
  allVersions.value.push(info)
}
</script>
