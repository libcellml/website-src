<template>
  <v-container>
    <div id="servicesLandingPageSection">
      <h1>Services</h1>
      <v-row>
        <v-col class="col-12 col-md-4" id="service-translation">
          <v-btn block :class="'big-button'" to="/translate">
            <v-icon color="white" x-large>mdi-translate</v-icon><br />
            Translate CellML
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ServicesLandingPageSection',
}
</script>

<style scoped>
v-col {
  align-content: center;
}
</style>
