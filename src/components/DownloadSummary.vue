<template>
  <v-container>
    <div id="downloadContent">
      <h1>Download libCellML</h1>
      <v-row>
        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'download-button'" v-on="on">
                <v-icon color="white" x-large>mdi-microsoft-windows</v-icon>
              </v-btn>
            </template>
            <span
              >Launch installer for the latest version for Microsoft
              Windows</span
            >
          </v-tooltip>
        </v-col>
        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'download-button'" v-on="on">
                <v-icon color="white" x-large>mdi-linux</v-icon>
              </v-btn>
            </template>
            <span>Launch installer for the latest version for Linux</span>
          </v-tooltip>
        </v-col>
        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'download-button'" v-on="on">
                <v-icon color="white" x-large>mdi-apple</v-icon>
              </v-btn>
            </template>
            <span>Launch installer for the latest version for MacOS</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn block :class="'download-button'" v-on="on">
                Web assembly
              </v-btn>
            </template>
            <span
              >Launch installer for the latest version of web assembly
              code</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Dependecies and requirements</h3>
          libCellML is intended to be lightweight and transportable, but does
          require a couple of libraries. If you use the installers, then all
          package requirements are included in them. If you are building outside
          of the installers, you will need to check that you have them on your
          computer. A complete list of historical versions and operating system
          options is shown below.
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'DownloadSummary',
}
</script>

<style scoped>
v-col {
  align-content: center;
}

button.download-button {
  background-color: var(--deep-blue-grey) !important;
  color: white;
  min-height: 6rem;
}

button.download-button:hover {
  background-color: var(--deep-red) !important;
}
</style>
