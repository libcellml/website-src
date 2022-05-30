<template>
  <h2>Limitiations</h2>
  This service has some limitations that it is important to take note of.
  <v-list>
    <v-list-item>
      <v-list-item-icon> mdi-circle-medium </v-list-item-icon>
      <v-list-item-title
        >For OMEX files - <strong>Only</strong> CellML files are updated, SED-ML
        files that reference CellML files are not updated.</v-list-item-title
      >
    </v-list-item>
    <v-list-item>
      <v-list-item-icon> mdi-circle-medium </v-list-item-icon>
      <v-list-item-title
        >Definite integrals will be translated even though they are not valid in
        CellML 2.0.</v-list-item-title
      >
    </v-list-item>
    <v-list-item>
      <v-list-item-icon> mdi-circle-medium </v-list-item-icon>
      <v-list-item-title
        >Will not validate OMEX archives to determine if they are valid or
        not.</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>
