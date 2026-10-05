<template>
  <div class="user">
    <sphinx-page
      :baseURL="`/generated/${store.current_documentation_version}/user`"
      pageNotFoundName="NotFound"
    />
  </div>
</template>

<script setup>
import { useSiteStore } from '@/stores/site'

import { SphinxPage } from 'vue3-sphinx-xml'
import { useSphinxXml } from '@/composables/useSphinxXml'

useSphinxXml()

const store = useSiteStore()
</script>
