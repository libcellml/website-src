<template>
  <v-row>
    <v-col class="col-12 col-md-4" id="service-translation">
      <v-btn block :class="'big-button'" to="/services/translate">
        <v-icon color="white" x-large>mdi-translate</v-icon>
        <small-spacer />
        Translate CellML
      </v-btn>
    </v-col>

    <v-col class="col-12 col-md-4" id="service-validation">
      <v-btn block :class="'big-button'" to="/services/validate">
        <v-icon color="white" x-large>mdi-file-check-outline</v-icon>
        <small-spacer />
        Validate CellML
      </v-btn>
    </v-col>

    <v-col class="col-12 col-md-4" id="service-import">
      <v-btn block :class="'big-button'" to="/services/import">
        <v-icon color="white" x-large>mdi-file-import</v-icon>
        <small-spacer />
        Import CellML
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import SmallSpacer from './SmallSpacer.vue';
</script>
