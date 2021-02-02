<template>
  <v-container>
    <div id="documentationContent">
      <h1>Documentation</h1>
      <v-row>
        <v-col class="col-12 col-md-4" id="api">
          <v-btn block :class="'big-button'" to="/documentation/api">
            <!-- <v-icon color="white" x-large>mdi-content-copy</v-icon> -->
            <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon
            ><br />
            API Documentation
          </v-btn>
        </v-col>

        <v-col class="col-12 col-md-4" id="guides">
          <v-btn block :class="'big-button'" to="/documentation/guides">
            <!-- <v-icon color="white" x-large>mdi-book-open-page-variant</v-icon> -->
            <!-- <v-icon color="white" x-large>mdi-teach</v-icon> -->
            <!-- <v-icon color="white" x-large>mdi-school</v-icon> -->
            <v-icon color="white" x-large>mdi-account-group</v-icon>
            <!-- <v-icon color="white" x-large>mdi-account-question</v-icon> -->
            <br />
            Users' Guides
          </v-btn>
        </v-col>

        <v-col class="col-12 col-md-4" id="developers">
          <v-btn block :class="'big-button'" to="/documentation/developers">
            <!-- <v-icon color="white" x-large>mdi-account</v-icon> -->
            <!-- <v-icon color="white" x-large>mdi-wrench</v-icon> -->
            <v-icon color="white" x-large>mdi-cogs</v-icon>
            <!-- <v-icon color="white" x-large>mdi-git</v-icon> -->
            <br />
            Developers' Guides
          </v-btn>
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
</style>
