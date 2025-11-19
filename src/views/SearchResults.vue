<template>
  <v-container>
    <h1>Search Results for "{{ route.query.q }}"</h1>
    
    <v-progress-circular v-if="searchStore.isLoading" indeterminate />

    <div v-else>
      <v-card v-for="result in searchStore.results" :key="result.href" :to="result.href" class="mb-4">
        <v-card-title>{{ result.title }}</v-card-title>
        <v-card-text>
           {{ result.content.substring(0, 200) }}...
        </v-card-text>
      </v-card>
      
      <v-alert v-if="searchStore.results.length === 0" type="info">
        No results found.
      </v-alert>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const route = useRoute()
const searchStore = useSearchStore()

const runSearch = async () => {
  const query = route.query.q
  if (!searchStore.indexLoaded) {
    await searchStore.loadIndex()
  }
  searchStore.search(query)
}

onMounted(() => {
  runSearch()
})

// Watch for changes (e.g. user types in search bar while ON search page)
watch(() => route.query.q, () => {
  runSearch()
})
</script>
