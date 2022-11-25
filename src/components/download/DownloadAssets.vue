<template>
  <v-row>
    <v-col>
      <h2 id="windows-available-versions">Windows</h2>
      <h3>Available versions</h3>
      <version-entries :entries="winOSVersions" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h2 id="macos-available-versions">macOS</h2>
      <h3>Available versions</h3>
      <version-entries :entries="macOSVersions" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h2 id="linux-available-versions">Linux</h2>
      <h3>Available versions</h3>
      <version-entries :entries="linuxOSVersions" />
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

import VersionEntries from './VersionEntries.vue'

const props = defineProps({
  macOSVersions: Array,
  winOSVersions: Array,
  linuxOSVersions: Array,
})

const { macOSVersions, winOSVersions, linuxOSVersions } = toRefs(props)
</script>
