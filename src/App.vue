<template>
  <v-app id="libcellml">
    <v-app-bar app clipped-left>
      <img src="./assets/logo.svg" width="40" height="40" />
      <v-app-bar-nav-icon @click="onSidebarOpen" />
      <v-row>
        <v-col
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :cols="link.label === 'Home' ? 2 : 1"
        >
          <v-btn text :to="link.url">
            {{ link.label }}
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <sidebar app></sidebar>
    <!--    <BreadCrumbs />-->
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!--      <Sidebar/>-->
      <!-- Provides the application the proper gutter -->
      <v-breadcrumbs app :items="breadcrumbs" class="breadcrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <template v-if="item.text === 'home'">
              <v-icon size="1.5em">mdi-home</v-icon>
            </template>
            <template v-else>
              {{ item.text.toUpperCase() }}
            </template>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <v-container fluid id="pageContent">
        <!-- If using vue-router -->
        <transition name="slide" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </v-container>
    </v-main>
    <NotificationContainer />
    <BackToTop />
    <v-footer app>
      <v-row justify="center" no-gutters>
        <v-col/>
        <v-col class="text-center" >
            <p id="footer-copyright">Copyright &#169; 2020 libCellML</p>
       </v-col>
        <v-col class="text-right">
          <p id="footer-ack"><router-link to="about">Acknowledgements</router-link></p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
// <div id="app">
//   <v-app id="inspire">
//     <v-navigation-drawer
//       fixed
//       v-model="drawer"
//       app
//     >
//       <v-list dense>
//         <v-list-tile @click="">
//           <v-list-tile-action>
//             <v-icon>home</v-icon>
//           </v-list-tile-action>
//           <v-list-tile-content>
//             <v-list-tile-title>Home</v-list-tile-title>
//           </v-list-tile-content>
//         </v-list-tile>
//         <v-list-tile @click="">
//           <v-list-tile-action>
//             <v-icon>contact_mail</v-icon>
//           </v-list-tile-action>
//           <v-list-tile-content>
//             <v-list-tile-title>Contact</v-list-tile-title>
//           </v-list-tile-content>
//         </v-list-tile>
//       </v-list>
//     </v-navigation-drawer>
//     <v-toolbar color="indigo" dark fixed app>
//       <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
//       <v-toolbar-title>Application</v-toolbar-title>
//     </v-toolbar>
//     <v-content>
//       <v-container fluid fill-height>
//         <v-layout
//           justify-center
//           align-center
//         >
//           <v-flex text-xs-center>
//             <v-tooltip left>
//               <v-btn icon large :href="source" target="_blank" slot="activator">
//                 <v-icon large>code</v-icon>
//               </v-btn>
//               <span>Source</span>
//             </v-tooltip>
//           </v-flex>
//         </v-layout>
//       </v-container>
//     </v-content>
//     <v-footer color="indigo" app inset>
//       <span class="white--text">&copy; 2017</span>
//     </v-footer>
//   </v-app>
// </div>
import BackToTop from '@/components/BackToTop'
import Sidebar from '@/components/Sidebar'
import NotificationContainer from '@/components/NotificationContainer'

import ui from '@/js/ui'

export default {
  name: 'App',

  components: {
    BackToTop,
    Sidebar,
    NotificationContainer,
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  mounted() {
  },

  data: () => ({
    pageChange: false,
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Download',
        url: '/download',
      },
      {
        label: 'Documentation',
        url: '/documentation',
      },
      {
        label: 'Developers',
        url: '/developers',
      },
      {
        label: 'About',
        url: '/about',
      },
    ],
    window: {
      width: 0,
      height: 0,
    },
  }),

  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
  },

  methods: {
    onSidebarOpen() {
      this.$store.commit('setSidebarOpen', !this.$store.getters.getSidebarOpen)
    },

    // KRM
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },

  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.pageChange = !this.pageChange
      }
    },
  },
}
</script>

<style>
#pageContent {
  background-size: 80px;
  background-position: 12px 12px;
}

.slide-enter-active,
.slide-leave-active {
  /* transition: opacity 1s, transform 1s; KRM used to be 1s for each */
  transition: opacity 0.25s, transform 0.25s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

.slide-enter {
  transform: translateX(20px);
}

.slide-leave-to {
  transform: translateX(-20px);
}

.col-1 {
  max-width: unset;
}
</style>
