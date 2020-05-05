import store from '@/store'
import { insertNewRoute } from '@/router'

export const insertRoute = {
  methods: {
    createAndInsertRoute: (page_name, componentName, subdir) => {
      let newRoute = {
        path: '/apidocs/' + page_name,
        name: 'api_docs_' + page_name,
        props: true,
        meta: { dynamic: true },
        beforeEnter(routeTo, routeFrom, next) {
          let existingData = store.state[subdir].pages.find(
            page => page.id === page_name,
          )
          if (existingData) {
            routeTo.params.componentData = existingData
            routeTo.params.name = componentName
            routeTo.params.subdir = subdir
            next()
          } else {
            store
              .dispatch(`${subdir}/fetchPage`, page_name)
              .then(data => {
                console.log('fetched page')
                console.log(data)
                routeTo.params.componentData = data
                routeTo.params.name = componentName
                routeTo.params.subdir = subdir
                store
                  .dispatch(`${subdir}/fetchDependeePages`, page_name)
                  .then(() => {
                    console.log('dependee fetched')
                    next()
                  })
                  .catch(error => {
                    if (error.response && error.response.status === 404) {
                      next({
                        name: '404',
                        params: { resource: 'dependee page fetch' },
                      })
                    } else {
                      next({ name: 'network-issue' })
                    }
                  })
                // next()
              })
              .catch(error => {
                if (error.response && error.response.status === 404) {
                  next({ name: '404', params: { resource: 'page fetch' } })
                } else {
                  next({ name: 'network-issue' })
                }
              })
          }
        },
        component: () =>
          import(
            /* webpackChunkName: "`api_docs_${item}`" */ '@/components/SkeletonComponent.vue'
          ),
      }
      if (!store.getters.hasRoute(newRoute.name)) {
        insertNewRoute(newRoute)
      }
    },
  },
}
