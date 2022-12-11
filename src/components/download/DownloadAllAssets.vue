<template>
  <h1>Current libCellML release</h1>
  <download-assets
    :macOSVersions="curMacOSVersions"
    :linuxOSVersions="curLinuxOSVersions"
    :winOSVersions="curWinOSVersions"
  />
  <h1>Previous libCellML releases</h1>
  <download-assets
    :macOSVersions="prevMacOSVersions"
    :linuxOSVersions="prevLinuxOSVersions"
    :winOSVersions="prevWinOSVersions"
  />
</template>

<script setup>
import { ref } from 'vue'

import { getDocumentationVersions } from '@/js/documentationversions'
import { useCommon } from '@/composables/common'

import DownloadAssets from '@/components/download/DownloadAssets.vue'

const { checkDownloadAvailability } = useCommon()
const availableVersions = getDocumentationVersions()

const curMacOSVersions = ref([])
const curLinuxOSVersions = ref([])
const curWinOSVersions = ref([])
const prevMacOSVersions = ref([])
const prevLinuxOSVersions = ref([])
const prevWinOSVersions = ref([])

function addEntry(recipient, assetDetails, version) {
  const value = recipient.value.find((elem) => elem.version === version)
  if (value) {
    value.assets.push(assetDetails)
  } else {
    recipient.value.push({ version, assets: [assetDetails] })
  }
}

const latestVersion = availableVersions[0]
for (const version of availableVersions) {
  const isLatest = latestVersion === version
  checkDownloadAvailability(version).then((response) => {
    if (response) {
      for (const entry of response.release.releaseAssets.edges) {
        if (entry.node.name.includes('macos')) {
          addEntry(
            isLatest ? curMacOSVersions : prevMacOSVersions,
            entry.node,
            version
          )
        } else if (entry.node.name.includes('windows')) {
          addEntry(
            isLatest ? curWinOSVersions : prevWinOSVersions,
            entry.node,
            version
          )
        } else if (entry.node.name.includes('ubuntu')) {
          addEntry(
            isLatest ? curLinuxOSVersions : prevLinuxOSVersions,
            entry.node,
            version
          )
        }
      }
    }
  })
}
</script>
