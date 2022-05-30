<template>
  <div id="documentationContent">
    <h1>Documentation</h1>
    <v-row>
      <v-col v-if="haveAPIDocumentation" col="12" md="4" id="api">
        <v-btn block :class="'big-button'" to="/documentation/latest/api">
          <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon
          ><br />
          API Documentation
        </v-btn>
      </v-col>

      <v-col v-if="haveUserGuidesDocumentation" col="12" md="4" id="guides">
        <v-btn
          block
          :class="'big-button'"
          to="/documentation/latest/userguides"
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
          to="/documentation/latest/developer"
        >
          <v-icon color="white" x-large>mdi-cogs</v-icon>
          <br />
          Developers' Guides
        </v-btn>
      </v-col>
    </v-row>
    <h3>Documentation versions</h3>
    <p>
      The links above will take you to the latest version of the available
      documentation. For older versions of the documentation, please visit the
      <router-link to="/documentation">Documentation landing page</router-link>.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

import { useCommon } from '../../composables/common'
import { getDocumentationVersions } from '../../js/versions';

const store = useStore()
const { checkDocumentationAvailability } = useCommon()

const haveAPIDocumentation = ref(false)
const haveUserGuidesDocumentation = ref(false)
const haveDeveloperDocumentation = ref(false)

const latest = getDocumentationVersions()[0]

checkDocumentationAvailability(
  latest,
  haveAPIDocumentation,
  haveUserGuidesDocumentation,
  haveDeveloperDocumentation
)
</script>
