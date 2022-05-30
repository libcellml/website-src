<template>
  <div id="services-content">
    <h1>Services</h1>
    <v-row>
      <v-col class="col-12 col-md-4" id="service-translation">
        <v-btn block :class="'big-button'" to="/translate">
          <v-icon color="white" x-large>mdi-translate</v-icon><br />
          Translate CellML
        </v-btn>
      </v-col>

      <v-col class="col-12 col-md-4" id="service-validation">
        <v-btn block :class="'big-button'" to="/validate">
          <v-icon color="white" x-large>mdi-file-check-outline</v-icon><br />
          Validate CellML
        </v-btn>
      </v-col>

      <v-col class="col-12 col-md-4" id="service-import">
        <v-btn block :class="'big-button'" to="/import">
          <v-icon color="white" x-large>mdi-file-import</v-icon><br />
          Import CellML
        </v-btn>
      </v-col>
    </v-row>
    <h3>About these services</h3>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> Translate CellML </v-card-title>
          <v-card-text>
            The translate service uses an XSLT document to transform a CellML
            1.0 or CellML 1.1 model to CellML 2.0.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Validate CellML </v-card-title>
          <v-card-text>
            The validate service takes an existing CellML 2.0 model and reports
            on errors found. The errors reported are those found while parsing
            the model and errors found while validating the model.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Import CellML </v-card-title>
          <v-card-text>
            The import service takes an existing CellML 1.0 or CellML 1.1 model
            and uses libCellML to parse the model into CellML 2.0.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
