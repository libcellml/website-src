export const handleError = (error, next, pageName) => {
  if (error.response && error.response.status === 404) {
    next({
      name: '404',
      params: { resource: pageName },
    })
  } else {
    next({ name: 'network-issue' })
  }
}
