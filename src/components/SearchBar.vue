<template>
  <v-combobox
    v-model="selectedItem"
    v-model:search="searchQuery"
    :items="searchResults"
    :loading="isLoading"
    :no-filter="true"
    item-title="title"
    item-value="href"
    label="Search documentation..."
    variant="solo-filled"
    density="compact"
    hide-details
    @focus="loadIndex"
    class="search-bar"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="item.raw.title" />
    </template>
  </v-combobox>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'

const searchQuery = ref('') // The text the user types
const selectedItem = ref(null) // The item the user clicks
const searchResults = ref([]) // The list of results from Fuse.js
const isLoading = ref(false) // For the loading spinner
const fuseInstance = ref(null)
let indexLoaded = false
const router = useRouter()

// Fuse.js options
const options = {
  includeScore: true,
  keys: [
    { name: 'title', weight: 2 }, // Give title more weight
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4, // Adjust for fuzziness
}

// 1. Load the index (only once)
const loadIndex = async () => {
  if (indexLoaded) return

  isLoading.value = true
  try {
    const response = await fetch('/search-index.json')
    const documents = await response.json()
    fuseInstance.value = new Fuse(documents, options)
    indexLoaded = true
    console.log('Search index loaded.')
  } catch (e) {
    console.error('Failed to load search index:', e)
  }
  isLoading.value = false
}

// 2. Watch the search query text
watch(searchQuery, (newQuery) => {
  // This guard is correct
  if (!newQuery || !fuseInstance.value) {
    searchResults.value = []
    return
  }

  // This is all correct
  const results = fuseInstance.value.search(newQuery)
  console.log(`Found ${results.length} results for query "${newQuery}"`)
  searchResults.value = results.slice(0, 10).map((r) => r.item)
  console.log('Search results:', searchResults.value)
})

// 3. Watch for when the user selects an item
watch(selectedItem, (selection) => {
  // v-combobox can return the raw object on selection
  if (selection && typeof selection === 'object') {
    router.push(selection.href) // Navigate to the page

    // Clear the search
    selectedItem.value = null
    searchQuery.value = '' // Manually clear the search text
    searchResults.value = []
  }
})
</script>

<style scoped>
.search-bar {
  /* You might want to give it a max-width */
  max-width: 400px;
  margin: 0 1rem;
}
</style>
