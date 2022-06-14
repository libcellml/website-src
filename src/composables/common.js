export function useCommon() {
  function checkDocumentationAvailability(version, api, user, developer) {
    const url = `/generated/${version}/directories.json`
    return fetch(url).then((response) => {
      response.json().then(
        (content) => {
          api.value = content.includes('api')
          user.value = content.includes('user')
          developer.value = content.includes('developer')
        },
        () => {
          api.value = false
          user.value = false
          developer.value = false
        }
      )
    })
  }
  return {
    checkDocumentationAvailability,
  }
}
