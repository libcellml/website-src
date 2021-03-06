<template>
  <v-app id="libcellml">
    <v-app-bar app clipped-left>
      <img src="./assets/logo.svg" width="40" height="40" />
      <v-app-bar-nav-icon @click="onSidebarOpen" />
      <v-row>
        <v-col
          id="topMenuBar"
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :cols="link.label === 'Home' ? 2 : 1"
        >
          <v-btn text :to="link.url">
            {{ link.label }}
          </v-btn>
        </v-col>
        <v-col id="bugButton">
          <v-tooltip bottom open-delay="200">
            <template v-slot:activator="{ on }">
              <v-btn
                plain
                v-on="on"
                href="https://github.com/libcellml/website-src/issues/new"
                target="_blank"
                class="bug-button"
              >
                <v-icon class="buggy">mdi-bug</v-icon>
                <span class="bug-text"></span>
              </v-btn>
            </template>
            <span
              >This website is a work in progress. Some parts have bugs
              <br />and others have outright infestations. We are working to fix
              these<br />
              issues but feel free to add an issue at <br />
              https://github.com/libcellml/website-src.<br /><br />
              <strong>Click me!</strong> if you want to add an issue right
              now!</span
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
    <BackToTop :xOffset="getXOffset" />
    <v-footer app>
      <v-row>
        <v-col />
        <v-col class="text-right">
          <span id="footer-ack">
            <router-link to="/#acknowledgements">Acknowledgements</router-link>
          </span>
        </v-col>
        <v-col cols="auto">
          <span id="footer-copyright">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
              ><img
                alt="Creative Commons Licence"
                style="border-width: 0"
                src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            /></a>
          </span>
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
    xOffset: 0,
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

  computed: {
    getXOffset() {
      return this.$store.getters.getSidebarOpen ? '12rem' : '1rem'
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

.bug-button {
  display: flex;
  justify-content: flex-end;
}

.buggy {
  /* margin-left: 3em; */
  font-size: 2.3em !important;
  color: yellowgreen !important;
}

.v-btn__content {
  opacity: 1 !important;
}

span.bug-text {
  font-size: 0em;
  min-width: 7em;
}

span.bug-text {
  font-size: 1.3em;
  min-width: 7em;
}

span.bug-text::after {
  content: 'Hover me!';
}

span.bug-text:hover::after {
  content: 'Click me!';
}
</style>
