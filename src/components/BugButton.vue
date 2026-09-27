<template>
  <v-tooltip anchor="bottom" :disabled="hintOpen">
    <template #activator="{ props }">
      <v-btn
        id="bug-button"
        v-bind="props"
        icon
        variant="text"
        :href="issueUrl"
        target="_blank"
        rel="noopener"
        aria-label="Report a problem with this website"
        class="bug-button"
        @click="onClick"
      >
        <v-icon :class="{ buggy: true, pulse: hintOpen }">mdi-bug</v-icon>
      </v-btn>
    </template>
    <span>Report a problem</span>
  </v-tooltip>

  <v-menu
    v-model="hintOpen"
    activator="#bug-button"
    location="bottom end"
    offset="8"
    :open-on-click="false"
    :close-on-content-click="false"
  >
    <v-card max-width="300" class="bug-hint" role="dialog" aria-live="polite">
      <v-card-text>
        <strong>Spotted a bug or something odd?</strong><br />
        Click the bug to tell us about it. We read every report.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dismissHint('got_it')">Got it</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { version as siteVersion } from '../../package.json'
import { EVENTS, trackEvent } from '@/js/analytics'

const ISSUES_URL = 'https://github.com/libcellml/website-src/issues/new'
const ISSUE_TEMPLATE = 'bug_report.yml'
const HINT_STORAGE_KEY = 'libcellml-bug-hint-seen'
const HINT_DELAY_MS = 5000

const route = useRoute()

// Pre-fill the GitHub issue form (.github/ISSUE_TEMPLATE/bug_report.yml)
// so the reporter only has to describe what went wrong. The query
// parameter names must match the field ids in the template.
const issueUrl = computed(() => {
  const params = new URLSearchParams({
    template: ISSUE_TEMPLATE,
    title: `Problem on ${route.path}`,
    page: window.location.origin + route.fullPath,
    browser: `${navigator.userAgent} (${window.innerWidth}x${window.innerHeight})`,
    version: siteVersion,
  })
  return `${ISSUES_URL}?${params.toString()}`
})

// First-visit hint ---------------------------------------------------------

const hintOpen = ref(false)
let dismissMethod = 'outside'
let hintTimer = null

function hintAlreadySeen() {
  try {
    return localStorage.getItem(HINT_STORAGE_KEY) !== null
  } catch {
    // Storage unavailable (private mode, blocked cookies): don't nag.
    return true
  }
}

function markHintSeen() {
  try {
    localStorage.setItem(HINT_STORAGE_KEY, new Date().toISOString())
  } catch {
    // Ignore; worst case the hint shows again next visit.
  }
}

function dismissHint(method) {
  dismissMethod = method
  hintOpen.value = false
}

// Any way of closing the hint (button, click outside, Esc, clicking the bug)
// counts as having seen it.
watch(hintOpen, (open, wasOpen) => {
  if (open) {
    trackEvent(EVENTS.REPORT_ISSUE_HINT_SHOWN, { page_path: route.path })
  } else if (wasOpen) {
    markHintSeen()
    trackEvent(EVENTS.REPORT_ISSUE_HINT_DISMISSED, { method: dismissMethod })
    dismissMethod = 'outside'
  }
})

onMounted(() => {
  if (!hintAlreadySeen()) {
    hintTimer = setTimeout(() => {
      hintOpen.value = true
    }, HINT_DELAY_MS)
  }
})

onBeforeUnmount(() => {
  clearTimeout(hintTimer)
})

function onClick() {
  trackEvent(EVENTS.REPORT_ISSUE_CLICK, {
    page_path: route.path,
    from_hint: hintOpen.value ? 'yes' : 'no',
  })
  if (hintOpen.value) {
    dismissHint('bug_click')
  } else {
    // Clicked before the hint appeared: no need to show it any more.
    clearTimeout(hintTimer)
    markHintSeen()
  }
}
</script>

<style scoped>
.buggy {
  font-size: 2.3em !important;
  color: yellowgreen !important;
}

.pulse {
  animation: bug-pulse 1s ease-in-out 2;
}

@keyframes bug-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }
}
</style>
