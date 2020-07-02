import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '@/store'
import { updateSphinxRoute } from '@/router/sphinx'
import { updateDoxygenRoute } from '@/router/doxygen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/apidocs',
    name: 'API Documentation',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateDoxygenRoute(routeTo, next)
    },
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/doxygen/Main.vue'),
  },
  {
    path: '/apidocs/:pageName',
    name: 'API Documentation Section',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateDoxygenRoute(routeTo, next)
    },
    component: () =>
      import(
        /* webpackChunkName: "dynamic" */ '../components/SkeletonComponent.vue'
      ),
  },
  {
    path: '/tutorials/*',
    name: 'TutorialPage',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateSphinxRoute(routeTo, next)
    },
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/sphinx/Main.vue'),
  },
  {
    path: '/tutorials',
    name: 'TutorialsIndex',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      updateSphinxRoute(routeTo, next)
    },
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/sphinx/Main.vue'),
  },
  {
    path: '/download',
    name: 'Download',
    component: () =>
      import(/* webpackChunkName: "download" */ '../views/Download.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () =>
      import(
        /* webpackChunkName: "networkIssue" */ '../views/NetworkIssue.vue'
      ),
  },
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.path !== from.path) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let value = { x: 0, y: 0 }
            if (to.hash) {
              value = window.scrollTo({
                top: document.querySelector(to.hash).offsetTop,
                behavior: 'smooth',
              })
            }
            resolve(value)
          }, 1100) // This number has to be higher than my page transition
        })
      } else if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}

const router = createRouter()

const appendCatchAll = () => {
  router.addRoutes([
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ])
}

appendCatchAll()

const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
  router.options.routes = routes
}

export const insertNewRoute = route => {
  store.commit('addRoute', route)
  resetRouter()
  const dynamicRoutes = store.getters.getDynamicRoutes
  router.addRoutes(dynamicRoutes)
  appendCatchAll()
}

export default router
