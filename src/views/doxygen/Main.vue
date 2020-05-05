<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>API Documentation</h1>
        <section
          v-for="(namespace, namespaceIndex) in data.namespaces"
          :key="'namespace_' + namespaceIndex"
          :id="'namespace_' + namespaceIndex"
        >
          <h2>
            Namespace:
            <router-link :to="{ path: '/apidocs/' + namespace.refId }">{{
              namespace.name
            }}</router-link>
          </h2>
          <ul class="namespace-group">
            <li class="namespace-group-item">Classes</li>
            <ul class="class-list">
              <li
                v-for="(namespaceClass,
                namespaceClassIndex) in namespace.classes"
                :key="namespace.name + '_' + namespaceClassIndex"
                class="class-list-item"
              >
                <router-link
                  :to="{ path: '/apidocs/' + namespaceClass.refId }"
                  >{{ namespaceClass.name }}</router-link
                >
              </li>
            </ul>
          </ul>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { insertRoute } from '@/mixins/InsertRoute'

export default {
  name: 'DoxygenMainContent',
  // mixins: [insertRoute],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  // created() {
  //   this.data.namespaces.forEach(namespace => {
  //     // this.createAndInsertRoute(namespace.refId, 'Namespace', 'doxygen')
  //     namespace.classes.forEach(class_ => {
  //       // this.createAndInsertRoute(class_.refId, 'Class', 'doxygen')
  //     })
  //   })
  // },
}
</script>

<style scoped></style>
