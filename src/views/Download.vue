<template>
  <div class="download">
    <v-container>
      <v-row>
        <v-col>
          <BreadCrumbs />
          <DownloadSummary />
          <DownloadComplete />
        </v-col>
      </v-row>
    </v-container>
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
