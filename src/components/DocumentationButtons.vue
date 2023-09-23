<template>
  <v-row>
    <v-col v-if="haveAPIDocumentation" col="12" md="4" id="api">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${latest}/api`"
      >
        <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon
        ><small-spacer />
        API Documentation
      </v-btn>
    </v-col>
    <v-col v-if="haveUserDocumentation" col="12" md="4" id="guides">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${latest}/tutorials`"
      >
        <v-icon color="white" x-large>mdi-account-group</v-icon>
        <small-spacer />
        Tutorials
      </v-btn>
    </v-col>
    <v-col v-if="haveDeveloperDocumentation" col="12" md="4" id="developer">
      <v-btn
        block
        :class="'big-button'"
        :to="`/documentation/${latest}/developer`"
      >
        <v-icon color="white" x-large>mdi-cogs</v-icon>
        <small-spacer />
        Developer Notes
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

import { useCommon } from '../composables/common'
import { getDocumentationVersions } from '../js/documentationversions'

import SmallSpacer from './SmallSpacer.vue'

const { checkDocumentationAvailability } = useCommon()

const latest = getDocumentationVersions()[0]

const haveAPIDocumentation = ref(false)
const haveUserDocumentation = ref(false)
const haveDeveloperDocumentation = ref(false)

checkDocumentationAvailability(
  latest,
  haveAPIDocumentation,
  haveUserDocumentation,
  haveDeveloperDocumentation
)
</script>
