<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <h1>libCellML</h1>
          <p>
            A software library that implements the CellML standard.
          </p>
          <h2>Get started</h2>
          <ul>
            <li><h3>Download</h3></li>
            <ul>
              <li>
                <v-btn outlined>C++ Libraries</v-btn>
              </li>
              <li>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined v-bind="attrs" v-on="on"
                      >Python Wheel</v-btn
                    >
                  </template>
                  <span
                    >For the Python savvy, it is also possible to 'pip install
                    libcellml'</span
                  >
                </v-tooltip>
              </li>
              <li>
                <v-btn outlined disabled>Javascript bytecode</v-btn>
              </li>
            </ul>
            <li><h3>Install</h3></li>
            <li><h3>Run</h3></li>
          </ul>
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
