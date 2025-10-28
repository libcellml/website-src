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
import { useNotificationsStore } from '@/stores/notifications'
import lunr from 'lunr'

const store = useNotificationsStore()

const searchQuery = ref('') // The text the user types
const selectedItem = ref(null) // The item the user clicks
const searchResults = ref([]) // The list of results from Fuse.js
const isLoading = ref(false) // For the loading spinner
const lunrIndex = ref(null)
const docMap = new Map()
let indexLoaded = false
const router = useRouter()

// 1. Load the index (only once)
const loadIndex = async () => {
  if (indexLoaded) return

  isLoading.value = true
  try {
    const response = await fetch('/search-index.json')
    const documents = await response.json()

    // 1. Lunr needs a map to get the original doc back from an ID
    documents.forEach((doc) => {
      docMap.set(doc.href, doc)
    })

    lunrIndex.value = lunr(function () {
      // Define the fields
      this.field('title', { boost: 10 }) // Boost title
      this.field('content')
      this.ref('href') // Use href as the unique ID

      // Add documents to the index
      documents.forEach((doc) => {
        this.add(doc)
      })
    })

    indexLoaded = true
  } catch (e) {
    store.add({
      type: 'error',
      title: 'Failed to load search index:',
      message: e.message,
    })
  }
  isLoading.value = false
}

/**
 * Modifies a raw search query for Lunr.js.
 *
 * If the query is "simple" (no special operators), it enhances each
 * term to search for both the exact term and a prefix-matched term.
 * e.g., "spec allo" -> "spec spec* allo allo*"
 *
 * If the query is "advanced" (contains *, ~, ^, +, -, or :),
 * it returns the query as-is for Lunr to parse.
 *
 * @param {string} rawQuery The user-typed search string
 * @returns {string} A Lunr-compatible query string
 */
function buildLunrQuery(rawQuery) {
  // Regex to detect Lunr special chars: *, ~, ^, +, -, or field:
  const specialCharRegex = /[*~^+:-]|\w:/
  const trimmedQuery = rawQuery.trim()

  // If query is empty or just whitespace, return empty.
  if (!trimmedQuery) {
    return ''
  }

  // Check if the user has already typed a special query
  const isSimpleQuery = !specialCharRegex.test(trimmedQuery)

  if (isSimpleQuery) {
    // It's a simple query.
    // Split into words, remove empty strings, and build the new query.
    // "search query" becomes "search search* query query*"
    return trimmedQuery
      .split(/\s+/) // Split on one or more spaces
      .map((term) => `${term} ${term}*`) // Add the term AND the wildcard term
      .join(' ')
  } else {
    // It's an advanced query. Return it as-is.
    return trimmedQuery
  }
}

// 2. Watch the search query text
watch(searchQuery, (newQuery) => {
  const lunrQuery = buildLunrQuery(newQuery)

  if (!lunrQuery || !lunrIndex.value) {
    searchResults.value = []
    return
  }

  try {
    const results = lunrIndex.value.search(lunrQuery)
    searchResults.value = results.slice(0, 10).map((r) => docMap.get(r.ref))
  } catch (e) {
    // Lunr can throw errors for malformed queries (e.g., trailing colon)
    store.add({
      type: 'error',
      title: 'Search error:',
      message: e.message,
    })
    searchResults.value = []
  }
})

// 3. Watch for when the user selects an item
watch(selectedItem, (selection) => {
  if (selection && typeof selection === 'object') {
    router.push(selection.href) // Navigate to the page

    selectedItem.value = null
    searchQuery.value = '' // Manually clear the search text
    searchResults.value = []
  }
})
</script>

<style scoped>
.search-bar {
  max-width: 400px;
  margin: 0 1rem;
  margin-left: auto;
}
</style>
