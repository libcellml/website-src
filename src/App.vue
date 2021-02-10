<template>
  <v-app id="libcellml">
    <v-app-bar app clipped-left>
      <img src="./assets/logo.svg" width="40" height="40" />
      <v-app-bar-nav-icon @click="onSidebarOpen" />
      <v-row id="topMenuBar">
        <v-col
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :cols="link.label === 'Home' ? 2 : 1"
        >
          <v-btn text :to="link.url">
            {{ link.label }}
          </v-btn>
        </v-col>
        <v-col>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-icon class="buggy">mdi-bug</v-icon>
                <span>Hover me!</span>
              </div>
            </template>
            <span
              >This website is a work in progress. Some parts have bugs
              <br />and others have outright infestations. We are working to fix
              these<br />
              issues but feel free to add an issue at <br />
              https://github.com/libcellml/website-src.</span
            >
          </v-tooltip>
        </v-col>
      </v-row>
    </v-app-bar>
    <!--      <Sidebar/>-->
    <!-- Provides the application the proper gutter -->
    <Sidebar app />

    <!-- Sizes your content based upon application components -->
    <v-main>
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
        <v-col />
        <v-col class="text-center">
          <p id="footer-copyright">Copyright &#169; 2021 libCellML</p>
        </v-col>
        <v-col class="text-right">
          <p id="footer-ack">
            <router-link to="about">Acknowledgements</router-link>
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import Sidebar from '@/components/Sidebar'
import NotificationContainer from '@/components/NotificationContainer'

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

  mounted() {},

  data: () => ({
    pageChange: false,
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Download',
        url: '/#download',
      },
      {
        label: 'Documentation',
        url: '/#documentation',
      },
      {
        label: 'Services',
        url: '/#services',
      },
      {
        label: 'About',
        url: '/#about',
      },
    ],
    window: {
      width: 0,
      height: 0,
    },
  }),

  methods: {
    onSidebarOpen() {
      this.$store.commit('setSidebarOpen', !this.$store.getters.getSidebarOpen)
    },
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

<style src="./css/general.css"></style>
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

.buggy {
  margin-left: 3em;
  font-size: 2.3em !important;
  color: yellowgreen !important;
}
</style>
