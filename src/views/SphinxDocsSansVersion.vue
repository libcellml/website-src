<template>
  <div :class="route.meta.subDoc">
    <sphinx-page
      :baseURL="`/generated/${route.meta.subDoc}`"
      pageNotFoundName="NotFound"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { SphinxPage } from 'vue3-sphinx-xml'
import { useSphinxXml } from '@/composables/useSphinxXml'

useSphinxXml()

const route = useRoute()
</script>
