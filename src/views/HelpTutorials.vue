<template>
  <div class="tutorials">
    <v-container>
      <v-row>
        <v-col>
          <sphinx-page
            :baseURL="`/data/sphinx/${$route.params.version}`"
            indexFileName="tutorials_index"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SphinxPage } from 'vue-sphinx-xml'

export default {
  name: 'Tutorials',
  components: {
    SphinxPage,
  },
}
</script>
