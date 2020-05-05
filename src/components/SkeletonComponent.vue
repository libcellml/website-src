<template>
  <v-container>
    <v-row>
      <v-col>
        <DynamicComponent
          :component-data="data"
          :component-type="componentType"
          :component-sub-dir="componentSubDir"
        ></DynamicComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DynamicComponent from './DynamicComponent'
import { updateDoxygenRoute } from '@/router/doxygen'

export default {
  name: 'SkeletonComponent',
  props: {
    data: {
      type: Object,
      requited: true,
    },
    componentType: {
      type: String,
      requited: true,
    },
    componentSubDir: {
      type: String,
      requited: true,
    },
  },
  components: { DynamicComponent },
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
      updateDoxygenRoute(to, next)
    }
  },
}
</script>

<style scoped></style>
