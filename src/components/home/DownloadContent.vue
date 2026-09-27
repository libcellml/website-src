<template>
  <div id="downloadContent">
    <h1>Download libCellML</h1>
    <download-buttons />
    <h2>Further information</h2>
    <p>
      For further information on downloads please visit the
      <router-link to="/download">Download page</router-link>. If you are
      wanting to build from source please follow the instructions on the
      <router-link
        :to="{
          path: '/documentation/latest/user/installation/build_from_source',
        }"
        >Build from source
      </router-link>
      page.
    </p>
  </div>
</template>

<script setup>
import DownloadButtons from '@/components/download/DownloadButtons.vue'
</script>
