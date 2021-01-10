<template>
  <div class="breadcrumbs" id="breadcrumbs">
    <v-container>
      <v-row>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  data: () => ({
    items: [],
  }),
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
  },
}
</script>
<style scoped></style>
