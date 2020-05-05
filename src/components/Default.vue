<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>Missing: {{ name }} of {{ variant }}</h3>
        <span>It seems the component was not found.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Default',
  props: {
    variant: {
      type: String,
    },
    name: {
      type: String,
    },
  },
}
</script>

<style scoped></style>
