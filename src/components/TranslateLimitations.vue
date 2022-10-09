<template>
  <h2>Limitiations</h2>
  This service has some limitations that it is important to take note of:
  <v-list>
    <v-list-item prepend-icon="mdi-circle-medium">
      <v-list-item-title>
        For COMBINE archives - <strong>Only</strong> CellML files are updated,
        SED-ML files that reference CellML files are not updated.
      </v-list-item-title>
    </v-list-item>
    <v-list-item
      prepend-icon="mdi-circle-medium"
      title="Definite integrals will be translated even though they are not valid in
        CellML 2.0."
    >
    </v-list-item>
    <v-list-item
      prepend-icon="mdi-circle-medium"
      title="Will not validate COMBINE archives to determine if they are valid or
        not."
    >
    </v-list-item>
  </v-list>
</template>
