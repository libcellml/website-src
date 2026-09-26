<template>
  <div class="asset-entry">
    <ul>
      <li
        v-for="entry in entries"
        :key="entry.version"
        style="list-style-type: none"
      >
        <strong>{{ entry.version }}</strong>
        <ul>
          <li v-for="asset in entry.assets" :key="asset.name">
            <a
              :href="asset.downloadUrl"
              :download="asset.name"
              @click="onAssetClicked(asset.name, entry.version)"
            >
              {{ asset.name }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

import { getDocumentationVersions } from '@/js/documentationversions'
import { trackInstallerDownload } from '@/js/analytics'

const props = defineProps({
  entries: Array,
})

const { entries } = toRefs(props)

const latest = getDocumentationVersions()[0]

function onAssetClicked(assetName, version) {
  trackInstallerDownload(assetName, version, version === latest, 'all_releases')
}
</script>

<style scoped>
.asset-entry ul {
  margin-left: 1rem;
}
</style>
