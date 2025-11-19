import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import lunr from 'lunr'
import { useNotificationsStore } from '@/stores/notifications'

export const useSearchStore = defineStore('search', () => {
  // -- State --
  const isLoading = ref(false)
  const indexLoaded = ref(false)
  const results = ref([]) // The currently filtered results

  // We use shallowRef because we don't need deep reactivity for the Lunr index
  // or the huge Map.
  const lunrIndex = shallowRef(null)
  const docMap = shallowRef(new Map())

  const notifications = useNotificationsStore()

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

  // -- Action: Load Index --
  async function loadIndex() {
    // Prevent double-loading
    if (indexLoaded.value || isLoading.value) return

    isLoading.value = true
    try {
      const response = await fetch('/search-index.json')
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)

      const documents = await response.json()

      // Create local variables to build structures
      const localMap = new Map()

      // Build doc href map
      documents.forEach((doc) => {
        localMap.set(doc.href, doc)
      })
      docMap.value = localMap

      // Build Lunr Index
      lunrIndex.value = lunr(function () {
        this.field('title', { boost: 10 })
        this.field('content')
        this.ref('href')

        documents.forEach((doc) => {
          this.add(doc)
        })
      })

      indexLoaded.value = true
    } catch (e) {
      console.error(e)
      notifications.add({
        type: 'error',
        title: 'Failed to load search index:',
        message: e.message,
      })
    } finally {
      isLoading.value = false
    }
  }

  // -- Action: Perform Search --
  function search(queryText) {
    // Safety checks
    if (!queryText || !indexLoaded.value || !lunrIndex.value) {
      results.value = []
      return
    }

    const lunrQuery = buildLunrQuery(queryText)

    if (!lunrQuery) {
      results.value = []
      return
    }

    try {
      // Run search against Lunr
      const rawResults = lunrIndex.value.search(lunrQuery)

      // Map refs back to full document objects (limit to top 50 for performance)
      results.value = rawResults
        .slice(0, 50)
        .map((r) => docMap.value.get(r.ref))
    } catch (e) {
      // Handle malformed queries
      console.warn('Search error:', e.message)
      results.value = []
    }
  }

  return {
    isLoading,
    indexLoaded,
    results,
    loadIndex,
    search,
  }
})
