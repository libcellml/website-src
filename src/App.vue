<template>
  <v-app id="libcellml">
    <v-app-bar app clipped-left>
      <!-- -->
      <v-app-bar-nav-icon @click="onSidebarOpen" />
      <v-row>
        <v-col cols="1" />
        <v-col
          v-for="link in links"
          :key="`${link.label}-header-link`"
          :cols="link.label === 'Home' ? 3 : 1"
        >
          <v-btn text rounded :to="link.url">
            {{ link.label }}
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <Sidebar :routeName="$route.name" :routeParams="$route.params" />
    <!--    <BreadCrumbs />-->
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!--      <Sidebar/>-->
      <!-- Provides the application the proper gutter -->
      <v-container
        fluid
        id="pageContent"
        :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
      >
        <!-- If using vue-router -->
        <transition name="slide" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </v-container>
    </v-content>
    <NotificationContainer />
    <BackToTop />
    <v-footer app>
      <v-row justify="center" no-gutters>
        <v-col />
        <v-col class="text-center">
          {{ new Date().getFullYear() }} — <strong>libCellML</strong>
        </v-col>
        <v-col class="text-right">Created: {{ currentDate }} </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import Sidebar from '@/components/Sidebar'
import NotificationContainer from '@/components/NotificationContainer'
// import BreadCrumbs from '@/components/BreadCrumbs'

export default {
  name: 'App',

  components: {
    // BreadCrumbs,
    BackToTop,
    Sidebar,
    NotificationContainer,
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
        label: 'API Docs',
        url: '/apidocs',
      },
      {
        label: 'Tutorials',
        url: '/tutorials',
      },
      {
        label: 'About',
        url: '/about',
      },
    ],
    backgroundImage: require('@/assets/logo.svg'),
  }),

  computed: {
    currentDate: () => {
      let d = new Date()
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear()
    },
  },

  methods: {
    onSidebarOpen() {
      this.$store.commit('setSidebarOpen', !this.$store.getters.getSidebarOpen)
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
  transition: opacity 1s, transform 1s;
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
</style>
