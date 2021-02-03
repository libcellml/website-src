<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Oops!</h1>
        <BrokenLink />
        <p>or go <router-link to="/">back to the home page</router-link></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BrokenLink from '@/components/BrokenLink'

export default {
  name: 'NotFound',
  components: {
    BrokenLink,
  },
}
</script>
