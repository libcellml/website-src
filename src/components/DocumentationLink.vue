<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <h3>Documentation versions</h3>
          The links above will take you to the latest versions of the API
          documentation, the Users' Guides, and the Developers' Guides. For
          earlier versions of the documentation, please visit the
          <router-link to="documentation">Documentation page</router-link>.
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link to="documentation"
            >See the Documentation archives</router-link
          >
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'DocumentationLink',
}
</script>

<style scoped>
</style>
