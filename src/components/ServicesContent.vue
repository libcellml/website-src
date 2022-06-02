<template>
  <h3>About these services</h3>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Translate CellML</v-card-title>
        <v-card-text>
          The translate service uses an XSLT document to transform a CellML 1.0
          or CellML 1.1 model to CellML 2.0.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Validate CellML</v-card-title>
        <v-card-text>
          The validate service takes an existing CellML 2.0 model and reports on
          errors found. The errors reported are those found while parsing the
          model and errors found while validating the model.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Import CellML</v-card-title>
        <v-card-text>
          The import service takes an existing CellML 1.0 or CellML 1.1 model
          and uses libCellML to parse the model into CellML 2.0.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
