<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>libCellML</h1>
          <p>
            A software library that implements the CellML standard.
          </p>
          <h2>Get started</h2>
          <h3>Download</h3>
          <v-row>
            <v-col cols="12">
              <v-btn outlined>C++ Libraries</v-btn>
            </v-col>
            <v-col cols="12">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined v-bind="attrs" v-on="on">Python Wheel</v-btn>
                </template>
                <span>For the Python savvy, 'pip install libcellml'</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12">
              <v-btn outlined disabled>Javascript bytecode</v-btn>
            </v-col>
          </v-row>

          <h3>Install</h3>
          <h3>Run</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import GetStarted from '@/components/GetStarted.vue'

export default {
  name: 'Home',
  components: {
    // GetStarted,
  },
}
</script>
