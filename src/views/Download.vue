<template>
  <div class="download">
    <BreadCrumbs />
    <DownloadSummary />
    <DownloadComplete />
  </div>
</template>

<script>
import DownloadSummary from '@/components/DownloadSummary'
import DownloadComplete from '@/components/DownloadComplete'
import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'Download',
  components: {
    DownloadSummary,
    DownloadComplete,
    BreadCrumbs,
  },
}
</script>

<style scoped></style>
