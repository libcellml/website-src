<template>
  <div class="download-view">
    <h1>Download libCellML</h1>
    <download-buttons />
    <h2>Dependencies and requirements</h2>
    <download-blurb />
    <h1>Previous libCellML releases</h1>
    <download-historical />
  </div>
</template>

<script setup>
import DownloadBlurb from '@/components/download/DownloadBlurb.vue'
import DownloadButtons from '@/components/download/DownloadButtons.vue'
import DownloadHistorical from '@/components/download/DownloadHistorical.vue'
</script>
