<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About libCellML</h1>

        <h3>
          libCellML is an easy-to-use library aiming to be useful to developers of CellML applications.
        </h3>
        <p>
          The purpose of CellML is to store and exchange computer-based mathematical models, allowing scientists to share models even if they are using different model-building software.
          The purpose of libCellML is to create, manipulate, serialise, deserialise, validate and instantiate CellML models.  Alongside that, libCellML offers functionality for annotation support, model debugging, mathematical analysis and code generation.
        </p>

        <h3>Questions and comments</h3>
        <p>
          The library is intended to be lightweight and focused purely in dealing with CellML models. 
          In achieving this, some of the convenience methods/objects that we might expect will not be part of libCellML. 
          If you have feature requests or questions please see **TODO**
        </p>

        <h3>Contributors</h3>
        <p>
          A complete list of the developers and contributors to the libCellML project are given on the <a href="https://github.com/cellml/libcellml/graphs/contributors">libCellML Github repository page</a>.
        </p>
       
        <h3>Supporters</h3>
        The libCellML team acknowledges the generous support of our sponsors. 

        <v-container class="image-box">
          <v-row>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_medtech_core.png" />
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_crbm.png" />
            </v-col>
             <v-col class="col-12 col-sm-6 col-md-4" >
              <img src="../assets/logo_aotearoa.png"/>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_sparc.png"/>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_vpr.png"/>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_abi.png"/>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-4">
              <img src="../assets/logo_maurice_wilkins.png"/>
            </v-col>
           
          </v-row>
        </v-container>



      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutInfo',
}
</script>

<style scoped></style>
