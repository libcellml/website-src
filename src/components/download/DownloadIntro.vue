<template>
  <div id="downloadContent">
    <h1>Download libCellML</h1>
    <v-row>
      <v-col class="col-12">
        <p>
          Binary distributions are not yet ready for release. In the meantime,
          please follow the instructions on the
          <router-link
            :to="{
              path: '/documentation/latest/userguides/installation/build_from_source',
            }"
            >Build from source
          </router-link>
          page.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-tooltip bottom open-delay="200">
          <template v-slot:activator="{ props }">
            <!-- Added disabled status until this is ready to go -->
            <v-btn block :class="'big-button'" v-bind="props" disabled>
              <v-icon color="white" x-large>mdi-microsoft-windows</v-icon>
              <small-spacer />
              Windows
            </v-btn>
          </template>
          <span>Launch installer for Microsoft Windows</span>
        </v-tooltip>
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-tooltip bottom open-delay="200">
          <template v-slot:activator="{ props }">
            <!-- Added disabled status until this is ready to go -->
            <v-btn block :class="'big-button'" v-bind="props" disabled>
              <v-icon color="white" x-large>mdi-apple</v-icon>
              <small-spacer />
              macOS
            </v-btn>
          </template>
          <span>Launch installer for MacOS</span>
        </v-tooltip>
      </v-col>

      <v-col class="col-12 col-md-3">
        <v-tooltip bottom open-delay="200">
          <template v-slot:activator="{ props }">
            <!-- Added disabled status until this is ready to go -->
            <v-btn block :class="'big-button'" v-bind="props" disabled>
              <icon-w-a />
              <small-spacer />
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
</template>

<script setup>
import IconWA from '@/assets/icons/IconWA.vue'
import SmallSpacer from '../SmallSpacer.vue';
</script>

<style scoped>
v-col {
  align-content: center;
}
</style>
