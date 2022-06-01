<template>
  <v-container>
    <v-row>
      <v-col>
        <p>The page that you've requested:</p>
        <h4>{{ lastURL }}</h4>
        <h4>{{ route.params.unknownPageName }}</h4>
        <br />
        <p>
          does not exist. Please use the "back" button on your browser to return
          to where you were, or start again using the links in the menu bar.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore()
const route = useRoute()

const lastURL = computed(() => {
  return store.getters.getLastUrl()
})
</script>