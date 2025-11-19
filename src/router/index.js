import { createWebHistory, createRouter } from 'vue-router'

import { useNotificationsStore } from '@/stores/notifications'
import { useSiteStore } from '@/stores/site'

import Home from '@/views/Home.vue'
// import { pageview } from 'vue-gtag'

import { getDocumentationVersions } from '../js/documentationversions'
import { useCommon } from '@/composables/common'

const { documentationInfoMap } = useCommon()

const DEFAULT_TITLE = 'libCellML'

function checkDocumentationVersion(to) {
  const siteStore = useSiteStore()
  const notificatonsStore = useNotificationsStore()

  const routeParams = to.params
  // Check that version exists otherwise redirect to latest version
  const availableVersions = getDocumentationVersions()
  if (availableVersions.includes(routeParams.version)) {
    siteStore.setCurrentDocumentationVersion(routeParams.version)
    return true
  } else if (routeParams.version === '') {
    return {
      name: 'Documentation',
      params: {
        version: availableVersions[0],
      },
    }
  } else if (routeParams.version === 'latest') {
    return changeRouteVersion(to, availableVersions[0])
  }

  notificatonsStore.add({
    type: 'error',
    title: `Could not find documentation for version: ${routeParams.version}`,
    message: 'redirecting to `latest` documentation page.',
  })
  return {
    name: 'Documentation',
    params: {
      version: availableVersions[0],
    },
  }
}

const homeRoute = {
  path: '/',
  name: 'Home',
  meta: { title: 'libCellML: Home' },
  component: Home,
  beforeEnter: (to, from, next) => {
    if (sessionStorage.getItem('redirect') !== null) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      next(redirect)
    } else {
      next()
    }
  },
}
const baseDocumentationRoute = {
  path: '/documentation',
  name: 'DocumentationHome',
  meta: { title: 'libCellML: Documentation' },
  component: () => import('@/views/DocumentationHome.vue'),
}
const servicesHomeRoute = {
  path: '/services',
  name: 'ServicesHome',
  meta: { title: 'libCellML: Services' },
  component: () => import('@/views/ServicesHome.vue'),
}

export let versionedRouteNames = ['DocumentationUser']
let versionedRoutes = [
  {
    path: '/documentation/:version/user/:pageName?(.+)',
    name: 'DocumentationUser',
    meta: { title: 'libCellML: User Guides' },
    component: () => import('@/views/DocumentationUser.vue'),
  },
]
let sphinxRoutes = ['DocumentationUser']
let doxygenRoutes = []
for (let key in documentationInfoMap) {
  if (key !== 'user') {
    // The old 'user' documentation is a special case and requires its own handling.
    const routeName = `Documentation${documentationInfoMap[key].name}`
    versionedRouteNames.push(routeName)
    if (key === 'api') {
      // The 'api' documentation is rendered with vue3-doxygen-xml, which is different
      // from the other versioned documentation.  They use vue3-sphinx-xml.
      doxygenRoutes.push(routeName)
      versionedRoutes.push({
        path: '/documentation/:version/api/:pageName?',
        name: routeName,
        meta: { title: `libCellML: ${documentationInfoMap[key].name}` },
        component: () => import('@/views/DoxygenAPI.vue'),
        beforeEnter: checkDocumentationVersion,
      })
    } else {
      sphinxRoutes.push(routeName)
      versionedRoutes.push({
        path: `/documentation/:version/:subDoc/:pageName*`,
        name: routeName,
        meta: { title: `libCellML: ${documentationInfoMap[key].name}` },
        component: () => import('@/views/SphinxDocsWithVersion.vue'),
        beforeEnter: checkDocumentationVersion,
      })
    }
  }
}
const userDocumentationHomeRoute = {
  path: '/documentation/:version/user',
  name: 'DocumentationUserHome',
  meta: { title: 'libCellML: User Guides' },
  component: () => import('@/views/DocumentationUserHome.vue'),
  beforeEnter: checkDocumentationVersion,
}
const theoryRedirectRoute = {
  path: '/documentation/theory',
  redirect: '/documentation/theory/',
}
const theoryDocumentationRoute = {
  path: '/documentation/theory/:pageName*',
  name: 'DocumentationTheory',
  meta: { title: 'libCellML: Theory', subDoc: 'theory' },
  component: () => import('@/views/SphinxDocsSansVersion.vue'),
}
const installationRedirectRoute = {
  path: '/documentation/installation',
  redirect: '/documentation/installation/',
}
const installationDocumentationRoute = {
  path: '/documentation/installation/:pageName*',
  name: 'DocumentationInstallation',
  meta: { title: 'libCellML: Installation', subDoc: 'installation' },
  component: () => import('@/views/SphinxDocsSansVersion.vue'),
}
const validateRoute = {
  path: '/services/validate',
  name: 'Validate',
  meta: { title: 'libCellML: Validate' },
  component: () => import('@/views/Validate.vue'),
}
const translateRoute = {
  path: '/services/translate',
  name: 'Translate',
  meta: { title: 'libCellML: Translate' },
  component: () => import('@/views/Translate.vue'),
}
const downloadRoute = {
  path: '/download',
  name: 'Download',
  meta: { title: 'libCellML: Download' },
  component: () => import('@/views/Download.vue'),
}
const aboutRoute = {
  path: '/about',
  name: 'About',
  meta: { title: 'libCellML: About' },
  component: () => import('@/views/About.vue'),
}
const importRoute = {
  path: '/services/import',
  name: 'Import',
  meta: { title: 'libCellML: Import' },
  component: () => import('@/views/Import.vue'),
}
const notFoundRoute = {
  path: '/notfound',
  name: 'NotFound',
  meta: { title: 'libCellML: Not Found' },
  component: () => import('../views/NotFound.vue'),
}
const catchEverythingRoute = {
  path: '/:catchUnknown(.*)',
  name: 'NotFound',
  meta: { title: 'libCellML: Not Found' },
  component: () => import('@/views/NotFound.vue'),
}

const routes = [
  homeRoute,
  aboutRoute,
  // theoryRedirectRoute,
  theoryDocumentationRoute,
  // installationRedirectRoute,
  installationDocumentationRoute,
  ...versionedRoutes,
  userDocumentationHomeRoute,
  baseDocumentationRoute,
  servicesHomeRoute,
  translateRoute,
  validateRoute,
  downloadRoute,
  importRoute,
  // notFoundRoute,
  catchEverythingRoute,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const header = document.querySelector('#app-header')
    if (to.name === homeRoute.name && to.hash) {
      const location = document.querySelector(to.hash)
      if (location) {
        return window.scrollTo({
          top: location.offsetTop - header.offsetHeight,
          behavior: 'smooth',
        })
      }
    } else if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const location = document.querySelector(to.hash)
          if (location) {
            resolve(
              window.scrollTo({
                top: location.offsetTop - header.offsetHeight,
                behavior: 'smooth',
              }),
            )
          }
          resolve({ left: 0, top: header.offsetHeight })
        }, 500)
      })
    }
  },
})

const prettifyTitles = [
  { search: 'classlibcellml_1_1', replace: 'Class libcellml::' },
  { search: 'namespacelibcellml', replace: 'Namespace libcellml' },
]

function convertToReadableText(bookmarkText) {
  for (const entry of prettifyTitles) {
    bookmarkText = bookmarkText.replace(entry.search, entry.replace)
  }
  bookmarkText = bookmarkText.replaceAll('_', ' ')
  // bookmarkText = bookmarkText.replace(/([A-Z])/g, ' $1') // Insert space before capital letter
  bookmarkText = bookmarkText.replace(/([0-9])/g, ' $1') // Insert space before number
  bookmarkText = bookmarkText.trim() // Removing leading space, if present
  return bookmarkText
}

function createBreadcrumb(to, label = undefined, choice = false) {
  let text = label
  if (label === undefined) {
    text = to.name
  }
  return {
    text,
    target: to,
    versionChoice: choice,
  }
}

export const calculateBreadcrumbs = (to) => {
  const versions = getDocumentationVersions()
  // If I wanted to disable the breadcrumb for *Home* when on the home page
  // I would set the *to* parameter to '', but this gives me a differently
  // sized home icon which I dislike more than having the home crumb a link.
  let crumbs = [createBreadcrumb({ path: '/' }, 'Home')]
  if (to.name !== 'Home') {
    let pages = to.path.split('/')
    pages.shift()
    let path = ''
    let depth = 0
    for (const el of pages) {
      depth += 1
      path += '/' + el
      const readableText = convertToReadableText(el)
      if (versions.includes(el)) {
        crumbs.push(createBreadcrumb('', el, true))
      } else if (doxygenRoutes.includes(to.name)) {
        let route = { path }
        if (el === pages[pages.length - 1]) {
          route = ''
        }

        crumbs.push(createBreadcrumb(route, readableText))
      } else if (sphinxRoutes.includes(to.name)) {
        const subPath = to.params.subDoc
        let route = { path }
        if (el !== subPath && path.includes(subPath)) {
          route = { path: path + '/index' }
        }
        if (depth === pages.length) {
          route = ''
        }
        if (pages[depth] === 'index') {
          route = ''
        }
        if (pages[depth - 1] !== 'index') {
          crumbs.push(createBreadcrumb(route, readableText))
        }
      } else if (depth === pages.length) {
        crumbs.push(createBreadcrumb('', readableText))
      } else {
        const route = { path }
        crumbs.push(createBreadcrumb(route, readableText))
      }
    }
  }

  return crumbs
}

router.beforeEach((to, from, next) => {
  const siteStore = useSiteStore()

  if (to.params.version) {
    // If it returns 'true', the version is valid and store is updated.
    // If it returns an object, it is a redirect command.
    const versionCheck = checkDocumentationVersion(to)

    if (typeof versionCheck === 'object') {
      // It's a redirect (e.g. 'latest' or invalid version)
      next(versionCheck)
      return
    }
  }

  siteStore.setBreadcrumbs(calculateBreadcrumbs(to))

  next()
})

router.afterEach((to, from) => {
  setTimeout(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  }, 0)
})

export default router

const keepKeys = [
  'fullPath',
  'hash',
  'href',
  // 'matched',
  'meta',
  'name',
  'params',
  'path',
  'query',
]

export const changeRouteVersion = (route, version) => {
  return {
    name: route.name,
    params: { ...route.params, version: version },
    query: route.query,
    hash: route.hash,
  }
}
