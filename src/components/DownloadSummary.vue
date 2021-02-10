<template>
  <v-container>
    <div id="downloadContent">
      <h1>Download libCellML</h1>
      <v-row>
        <v-col class="col-12">
          <p>
            Bianry distributions are not yet ready for release. In the meantime,
            please follow the instructions on the
            <a
              href="/documentation/guides/latest/installation/build_from_source"
              >Build from source
            </a>
            page.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- Added disabled status until this is ready to go -->
              <v-btn block :class="'big-button'" v-on="on" disabled>
                <v-icon color="white" x-large>mdi-microsoft-windows</v-icon>
                <br />
                Windows
              </v-btn>
            </template>
            <span>Launch installer for Microsoft Windows</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- Added disabled status until this is ready to go -->
              <v-btn block :class="'big-button'" v-on="on" disabled>
                <v-icon color="white" x-large>mdi-linux</v-icon>
                <br />
                Linux
              </v-btn>
            </template>
            <span>Launch installer for Linux</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- Added disabled status until this is ready to go -->
              <v-btn block :class="'big-button'" v-on="on" disabled>
                <v-icon color="white" x-large>mdi-apple</v-icon>
                <br />
                macOS
              </v-btn>
            </template>
            <span>Launch installer for MacOS</span>
          </v-tooltip>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- Added disabled status until this is ready to go -->
              <v-btn block :class="'big-button'" v-on="on" disabled>
                <IconWA />
                <br />
                Web assembly
              </v-btn>
            </template>
            <span>Launch installer for WebAssembly</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Dependencies and requirements</h3>
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
import IconWA from '@/assets/icons/IconWA'
export default {
  name: 'DownloadSummary',
  components: {
    IconWA,
  },
}
</script>

<style scoped>
v-col {
  align-content: center;
}

/* .documentation-button {
  background-color: var(--deep-blue-grey) !important;
  color: white !important;
  min-height: 6rem;
  text-align: center;
}

.documentation-button:hover {
  background-color: var(--deep-red) !important;
  color: white !important;
} */
</style>
