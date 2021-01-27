<template>
  <v-container>
    <v-row>
      <v-col>
        <div id="downloadContent">
          <h1>Downloading libCellML</h1>
          <v-row>
            <v-col class="col-12 col-md-3">
              <v-btn class="feature-btn" outlined
                ><v-icon>$vuetify.icons.windowsos</v-icon></v-btn
              >
            </v-col>
            <v-col class="col-12 col-md-3">
              <v-btn
                class="feature-btn"
                outlined
                to="documentation/guides/latest"
                ><v-icon>$vuetify.icons.macosos</v-icon></v-btn
              >
            </v-col>
            <v-col class="col-12 col-md-3">
              <v-btn class="feature-btn" outlined
                ><v-icon>$vuetify.icons.linuxos</v-icon></v-btn
              >
            </v-col>
            <v-col class="col-12 col-md-3">
              <v-btn class="feature-btn" outlined
                ><v-icon>$vuetify.icons.webassembly</v-icon></v-btn
              >
            </v-col>
          </v-row>

          <p>TODO: NB None of these buttons are linked to anything.</p>
          <h3 id="downloads_older_versions">Older versions</h3>
          <p>
            For older versions see the
            <router-link to="downloads/">
              downloads page
            </router-link>
            .
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DownloadContent',
}
</script>

<style scoped>
v-col {
  align-content: center;
}
.feature-btn {
  height: fit-content !important;
  width: 100%;
  padding: 1rem 1rem !important;
}
</style>
