<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          color="primary"
          @click="toTop"
        >
          <v-icon large>{{ upIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowUp } from '@mdi/js'

export default {
  name: 'BackToTop',

  data: () => {
    return {
      fab: false,
      upIcon: mdiArrowUp,
    }
  },

  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop() {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search,
      )
      this.$vuetify.goTo(0)
    },
  },
}
</script>
