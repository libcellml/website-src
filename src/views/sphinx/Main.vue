<template>
  <v-container>
    <v-row>
      <v-col>
        <document :element="element" :id="name" keepalive />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { updateSphinxRoute } from '@/router/sphinx'

export default {
  name: 'SphinxPage',
  components: {
    document: () => import('@/components/sphinx/templates/Document'),
  },
  props: {
    element: {
      type: Element,
    },
    name: {
      type: String,
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      if (to.hash && to.hash !== from.hash) {
        window.location.hash = to.hash
        window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      }
    } else {
      updateSphinxRoute(to, next)
    }
  },
}
</script>

<style scoped></style>
