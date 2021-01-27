<template>
  <v-container>
    <div id="documentationContent">
      <h1>Documentation</h1>
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'documentation-button'" v-on="on">
                <v-icon color="white" x-large>mdi-animation</v-icon>
                <v-icon color="white" x-large
                  >mdi-book-open-page-variant</v-icon
                >
              </v-btn>
            </template>
            <span>See the latest API documentation</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'documentation-button'" v-on="on">
                <v-icon color="white" x-large
                  >mdi-book-open-page-variant</v-icon
                >
                <v-icon color="white" x-large>mdi-school</v-icon>
                <v-icon color="white" x-large>mdi-account-question</v-icon>
              </v-btn>
            </template>
            <span>See the latest users' guides</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'documentation-button'" v-on="on">
                <v-icon color="white" x-large>mdi-account-edit</v-icon>
                <v-icon color="white" x-large>mdi-wrench</v-icon>
                <v-icon color="white" x-large>mdi-cogs</v-icon>
                <v-icon color="white" x-large>mdi-git</v-icon>
              </v-btn>
            </template>
            <span>See the latest developers' guides</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'DocumentationSummary',
}
</script>

<style scoped>
v-col {
  align-content: center;
}

button.documentation-button {
  background-color: var(--deep-blue-grey) !important;
  color: white;
  min-height: 6rem;
}

button.documentation-button:hover {
  background-color: var(--deep-red) !important;
}
</style>
