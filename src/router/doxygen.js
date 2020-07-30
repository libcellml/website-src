import store from '@/store'
import { handleError } from '@/router/common'

const pageType = pageName => {
  if (pageName.startsWith('namespace')) {
    return 'Namespace'
  }
  return 'Class'
}

export const updateDoxygenRoute = (routeTo, next) => {
  const mainPage = routeTo.name === 'API Reference'
  const version = routeTo.params.version
  const pageName = mainPage ? 'index' : routeTo.params.pageName
  console.log('=============')
  console.log(routeTo)
  console.log(next)
  const getPageById = store.getters['doxygen/getPageById']
  console.log(getPageById)
  console.log(version, pageName)
  const existingData = getPageById(version, pageName)
  console.log(existingData)
  if (!mainPage) {
    routeTo.params.componentType = pageType(pageName)
    routeTo.params.componentSubDir = 'doxygen'
  }
  if (existingData) {
    routeTo.params.data = existingData
    next()
  } else {
    store
      .dispatch('doxygen/fetchPage', { version, page_name: pageName })
      .then(page => {
        console.log('fetched page:', page)
        routeTo.params.data = page
        if (mainPage) {
          next()
        } else {
          console.log('fetch dependee', version, pageName)
          store
            .dispatch('doxygen/fetchDependeePages', {
              version,
              page_name_source: pageName,
            })
            .then(() => {
              next()
            })
            .catch(error => {
              handleError(error, next, pageName)
            })
        }
      })
      .catch(error => {
        handleError(error, next, pageName)
      })
  }
}
