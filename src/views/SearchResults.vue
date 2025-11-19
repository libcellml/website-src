<template>
  <v-container class="search-results-page">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 mb-6">Search Results</h1>

        <v-text-field
          v-model="localQuery"
          label="Refine your search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          @keydown.enter="updateSearch"
          @click:clear="clearSearch"
          class="mb-4"
        >
          <template v-slot:append-inner>
            <v-btn
              size="small"
              color="primary"
              variant="text"
              @click="updateSearch"
              >Search</v-btn
            >
          </template>
        </v-text-field>

        <v-expansion-panels class="mb-8">
          <v-expansion-panel>
            <v-expansion-panel-title class="text-caption text-grey-darken-1">
              <v-icon start icon="mdi-help-circle-outline" size="small" />
              Search Syntax & Tips
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="text-body-2">
                <p class="mb-2">
                  By default, simple terms are treated as partial matches (e.g.,
                  <code>pars</code> matches <code>parser</code>). For precise
                  control, you can use the following syntax:
                </p>

                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left">Feature</th>
                      <th class="text-left">Syntax</th>
                      <th class="text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Exact Match</strong></td>
                      <td>Type the exact word</td>
                      <td><code>parser</code></td>
                    </tr>
                    <tr>
                      <td><strong>Wildcard</strong></td>
                      <td><code>*</code> (expands term)</td>
                      <td><code>valid*</code> (matches validate, validator)</td>
                    </tr>
                    <tr>
                      <td><strong>Boost</strong></td>
                      <td><code>^n</code> (increases relevance)</td>
                      <td>
                        <code>parser^10 model</code> (parser is more important)
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Presence</strong></td>
                      <td>
                        <code>+</code> (must have), <code>-</code> (must not)
                      </td>
                      <td><code>+cellml -python</code></td>
                    </tr>
                    <tr>
                      <td><strong>Fuzziness</strong></td>
                      <td><code>~n</code> (allows typos/edits)</td>
                      <td><code>modle~1</code> (matches model)</td>
                    </tr>
                    <tr>
                      <td><strong>Specific Field</strong></td>
                      <td><code>field:term</code></td>
                      <td><code>title:api</code></td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div v-if="searchStore.isLoading" class="text-center mt-10">
          <v-progress-circular indeterminate color="primary" size="64" />
          <p class="mt-4 text-grey">Searching documentation...</p>
        </div>

        <div v-else>
          <div v-if="results.length > 0">
            <p class="text-subtitle-2 text-grey mb-4">
              Found {{ results.length }} result{{
                results.length !== 1 ? 's' : ''
              }}
            </p>

            <v-card
              v-for="(result, i) in results"
              :key="`search_result_${i}`"
              :to="result.href"
              class="mb-4 result-card"
              variant="flat"
            >
              <v-card-item>
                <template v-slot:title>
                  <span class="text-primary font-weight-bold">{{
                    result.title
                  }}</span>
                </template>
                <template v-slot:subtitle>
                  <span class="text-caption">{{ result.href }}</span>
                </template>
              </v-card-item>

              <v-card-text class="pt-2">
                {{ truncateText(result.content, 250) }}
              </v-card-text>
            </v-card>
          </div>

          <v-alert
            v-else-if="hasSearched"
            type="info"
            variant="tonal"
            icon="mdi-magnify-remove-outline"
          >
            No results found for <strong>"{{ currentQuery }}"</strong>. Try
            adjusting your search terms or check the search tips above.
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

// Local state for the input field
const localQuery = ref('')

// Computed properties for UI
const results = computed(() => searchStore.results)
const currentQuery = computed(() => route.query.q || '')
const hasSearched = computed(() => !!currentQuery.value)

const truncateText = (text, length) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const updateSearch = () => {
  if (!localQuery.value.trim()) return

  router.push({
    name: 'Search',
    query: { q: localQuery.value },
  })
}

const clearSearch = () => {
  localQuery.value = ''
  router.push({ name: 'Search' }) // Clear query param
  searchStore.results = []
}

const runSearchFromUrl = async () => {
  const query = route.query.q

  // Sync the input box with the URL (in case we arrived via Header search)
  localQuery.value = query || ''

  if (!query) {
    searchStore.results = []
    return
  }

  // Ensure index is ready
  if (!searchStore.indexLoaded) {
    await searchStore.loadIndex()
  }

  // Execute Search
  searchStore.search(query)
}

onMounted(() => {
  runSearchFromUrl()
})

// Watch URL changes (e.g. user searches again from Header or uses Back button)
watch(
  () => route.query.q,
  () => {
    runSearchFromUrl()
  },
)
</script>

<style scoped>
.search-results-page {
  min-height: 60vh; /* Ensure footer stays down if few results */
}

.result-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background-color: rgba(
    var(--v-theme-surface),
    1
  );
}
</style>
