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
            <a :href="asset.downloadUrl" :download="asset.name">
              {{ asset.name }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  entries: Array,
})

const { entries } = toRefs(props)
</script>

<style scoped>
.asset-entry ul {
  margin-left: 1rem;
}
</style>
