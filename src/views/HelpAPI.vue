<template>
  <div class="api-reference">
    <v-container>
      <v-row>
        <v-col>
          <doxygen-xml :baseURL="`/data/doxygen/${$route.params.version}`" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DoxygenXml } from 'vue-doxygen-xml'

export default {
  name: 'APIReference',
  components: {
    DoxygenXml,
  },
}
</script>
