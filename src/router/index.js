import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import store from '@/store'

import { calculateBreadcrumbs } from './breadcrumbs'
import { getDoxygenVersions, getSphinxVersions } from '../js/versions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/documentation/api/:version/:pageName?',
    name: 'APIReferencePage',
    component: () =>
      import(/* webpackChunkName: "doxygen" */ '../views/HelpAPIPage.vue'),
  },
  {
    path: '/documentation/api',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/api/' + getDoxygenVersions()[0]
    },
  },
  {
    path: '/documentation/guides/:version/:pageName*',
    name: 'TutorialsPage',
    component: () =>
      import(/* webpackChunkName: "sphinx" */ '../views/HelpTutorialsPage.vue'),
  },
  {
    path: '/documentation/guides',
    redirect: to => {
      // Defaults to latest version, if not specified.
      return '/documentation/guides/' + getSphinxVersions()[0]
    }
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
  {
    path: '*',
    redirect: {
      name: '404',
      params: { resource: 'page' },
    },
  },
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,

    scrollBehavior(to, from, savedPosition) {
      if (to.path !== from.path && to.hash) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let value = { x: 0, y: 0 }
            let location = document.querySelector(to.hash)
            if (location) {
              value = window.scrollTo({
                top: location.offsetTop,
                behavior: 'smooth',
              })
            }
            resolve(value)
          }, store.getters.getTransitionDelay)
        })
      }
      else if (to.hash) {
        let location = document.querySelector(to.hash)
        if (location) {
          return window.scrollTo({
            top: location.offsetTop,
            behavior: 'smooth',
          })
        }
        return { x: 0, y: 0 }
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}

const router = createRouter()

router.beforeResolve((to, from, next) => {
  // Check for occurrences of 'latest' in the version field, and update
  console.log("before resolve:")
  console.log(to)
  if(to.params.version === 'latest' && to.name === 'APIReferencePage') {
    to.params.version = getDoxygenVersions()[0]
  }
  if(to.params.version === 'latest' && to.name === 'TutorialsPage') {
    to.params.version = getSphinxVersions()[0]
  }
  next()
})

router.beforeEach((to, from, next) => {
  store.commit('setBreadcrumbs', calculateBreadcrumbs(to))
  store.commit('updateLastURL', to.path)
  next()
})

router.afterEach((to, from) => {
  if (to.name !== from.name) {
    store.commit('togglePageContentChanged')
  }
})

export default router
