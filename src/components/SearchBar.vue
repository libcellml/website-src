<template>
  <v-combobox
    ref="searchInput"
    v-model="selectedItem"
    v-model:search="searchQuery"
    :items="searchStore.results"
    :loading="searchStore.isLoading"
    :no-filter="true"
    item-title="title"
    item-value="href"
    variant="solo-filled"
    density="compact"
    hide-details
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.enter="onEnter"
    class="search-bar"
  >
    <template v-slot:label>
      <span v-if="isFocused">Enter your search text</span>
      <span v-else class="d-flex align-center">
        <v-icon class="search-icon">mdi-magnify</v-icon> Type
        <kbd class="search-key ml-1 mr-1">/</kbd> to search documentation...
      </span>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="item.raw.title" />
    </template>
  </v-combobox>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const router = useRouter()
const searchStore = useSearchStore()

const searchQuery = ref('')
const selectedItem = ref(null)
const searchResults = ref([])
const searchInput = ref(null)
const isFocused = ref(false)
let debounceTimeout = null

const handleFocus = () => {
  isFocused.value = true
  searchStore.loadIndex()
}

const handleBlur = () => {
  isFocused.value = false
  selectedItem.value = null
  searchQuery.value = '' // Manually clear the search text
  searchResults.value = []
}

const onEnter = () => {
  // If an item is selected, v-model watcher handles navigation.
  if (searchQuery.value) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }, // Pass query in URL
    })

    // Close the dropdown
    searchInput.value.blur()
  }
}

// Watch the search query text
watch(searchQuery, (newQuery) => {
  // If the combobox clears the query (which happens on select), ignore
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  if (!newQuery) {
    searchStore.results = [] // Optional: clear dropdown results
    return
  }
  debounceTimeout = setTimeout(() => {
    searchStore.search(newQuery)
  }, 300)
})

watch(selectedItem, (selection) => {
  // v-combobox can sometimes set the model to the string text if no item matches.
  // We only want to navigate if it's an actual result object.
  if (selection && typeof selection === 'object' && selection.href) {
    router.push(selection.href)

    // Reset UI
    searchInput.value.blur()
  }
})

const handleKeydown = (event) => {
  // Guard: Don't trigger if the user is already typing
  // in an input, textarea, or contenteditable element.
  const activeEl = document.activeElement
  if (
    activeEl &&
    (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName) ||
      activeEl.isContentEditable)
  ) {
    return
  }

  // Check for the '/' key
  if (event.key === '/') {
    event.preventDefault() // Stop '/' from being typed

    // Focus the combobox (if it exists)
    if (searchInput.value) {
      searchInput.value.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// Clean up the listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.search-bar {
  max-width: 400px;
  margin: 0 1rem;
  margin-left: auto;
}

.search-icon {
  margin-right: 1rem;
}

.search-key {
  background-color: rgba(
    var(--v-theme-on-surface),
    0.08
  ); /* Subtle background */
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2); /* Subtle border */
  border-radius: 6px; /* Rounded corners */
  padding: 2px 4px; /* Spacing inside the box */
  font-family: monospace; /* Monospace font for the slash */
  font-size: 0.85em; /* Slightly smaller than text */
  font-weight: bold;
  line-height: 1;
  min-width: 20px;
  text-align: center;
  display: inline-block;
}
</style>
