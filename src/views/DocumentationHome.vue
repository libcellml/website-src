<template>
  <h1>Documentation</h1>
  <v-row>
    <v-col v-if="haveAPIDocumentation" col="12" md="4" id="api">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${store.state.current_documentation_version}/api`"
      >
        <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon><br />
        API Documentation
      </v-btn>
    </v-col>

    <v-col v-if="haveUserGuidesDocumentation" col="12" md="4" id="guides">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${store.state.current_documentation_version}/userguides`"
      >
        <v-icon color="white" x-large>mdi-account-group</v-icon>
        <br />
        Users' Guides
      </v-btn>
    </v-col>

    <v-col v-if="haveDeveloperDocumentation" col="12" md="4" id="developer">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${store.state.current_documentation_version}/developer`"
      >
        <v-icon color="white" x-large>mdi-cogs</v-icon>
        <br />
        Developers' Guides
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

import { useCommon } from '../composables/common'

const store = useStore()
const { checkDocumentationAvailability } = useCommon()

const haveAPIDocumentation = ref(false)
const haveUserGuidesDocumentation = ref(false)
const haveDeveloperDocumentation = ref(false)

function doCheckDocumentationAvailability() {
  checkDocumentationAvailability(
    store.state.current_documentation_version,
    haveAPIDocumentation,
    haveUserGuidesDocumentation,
    haveDeveloperDocumentation
  )
}
onMounted(() => {
  doCheckDocumentationAvailability()
})
onUpdated(() => {
  doCheckDocumentationAvailability()
})
</script>
