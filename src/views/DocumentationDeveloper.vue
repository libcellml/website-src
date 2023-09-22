<template>
  <div class="developer">
    <sphinx-page
      :baseURL="`/generated/${store.current_documentation_version}/developer`"
    />
  </div>
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

import { SphinxPage } from 'vue3-sphinx-xml'

const store = useSiteStore()
</script>
