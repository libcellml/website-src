<template>
  <div class="download-view">
    <h1>Download libCellML</h1>
    <download-buttons />
    <h2>Dependencies and requirements</h2>
    <download-blurb />
    <download-all-assets />
  </div>
</template>

<script setup>
import DownloadBlurb from '@/components/download/DownloadBlurb.vue'
import DownloadButtons from '@/components/download/DownloadButtons.vue'
import DownloadAllAssets from '@/components/download/DownloadAllAssets.vue'
</script>
