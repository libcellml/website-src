<template>
  <v-row>
    <template v-for="d in level1Documentation">
      <v-col v-if="haveDocumentation(d)">
        <big-button
          :id="d"
          :label="documentationInfoMap[d].label"
          :icon-name="documentationInfoMap[d].iconName"
          :target="`/documentation/${latest}/${d}`"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

import { useCommon } from '../composables/common'
import { getDocumentationVersions } from '../js/documentationversions'

import BigButton from './BigButton.vue'

const { checkDocumentationAvailability, documentationInfoMap } = useCommon()

const latest = getDocumentationVersions()[0]

const documentationKeys = Object.keys(documentationInfoMap)

let possibleDocumentation = {}
let level1Documentation = []
for (const value of documentationKeys) {
  if (documentationInfoMap[value].level === 1) {
    possibleDocumentation[value] = ref(false)
    level1Documentation.push(value)
  }
}
for (const value of level1Documentation) {
  checkDocumentationAvailability(possibleDocumentation[value], latest, value)
}

function haveDocumentation(documentation) {
  return possibleDocumentation[documentation].value
}
</script>
