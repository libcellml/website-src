<template>
  <v-row>
    <v-col>
      <h2 id="windows-available-versions">Windows</h2>
      <h3>Available versions</h3>
      <version-entries :entries="winOSVersions" />
      <h3>Requirements</h3>
      <div>TODO Stuff goes here</div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h2 id="linux-available-versions">Linux</h2>
      <h3>Available versions</h3>
      <version-entries :entries="linuxOSVersions" />
      <h3>Requirements</h3>
      <div>TODO Stuff goes here</div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h2 id="macos-available-versions">macOS</h2>
      <h3>Available versions</h3>
      <version-entries :entries="macOSVersions" />
      <h3>Requirements</h3>
      <div>TODO Stuff goes here</div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

import { getDocumentationVersions } from '@/js/versions'
import { useCommon } from '@/composables/common'
import VersionEntries from './VersionEntries.vue'

const { checkDownloadAvailability } = useCommon()
const availableVersions = getDocumentationVersions()

const macOSVersions = ref([])
const linuxOSVersions = ref([])
const winOSVersions = ref([])

function addEntry(recipient, assetDetails, version) {
  const value = recipient.value.find((elem) => elem.version === version)
  if (value) {
    value.assets.push(assetDetails)
  } else {
    recipient.value.push({ version, assets: [assetDetails] })
  }
}

for (const version of availableVersions) {
  checkDownloadAvailability(version).then((response) => {
    if (response) {
      for (const entry of response.release.releaseAssets.edges) {
        if (entry.node.name.includes('macos')) {
          addEntry(macOSVersions, entry.node, version)
        } else if (entry.node.name.includes('windows')) {
          addEntry(winOSVersions, entry.node, version)
        } else if (entry.node.name.includes('ubuntu')) {
          addEntry(linuxOSVersions, entry.node, version)
        }
      }
    }
  })
}
</script>
