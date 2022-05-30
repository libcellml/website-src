export function useCommon() {
  function checkDocumentationAvailability(version, api, userguides, developer) {
    const url = `/generated/${version}/directories.json`
    return fetch(url).then((response) => {
      response.json().then(
        (content) => {
          api.value = content.includes('api')
          userguides.value = content.includes('userguides')
          developer.value = content.includes('developer')
        },
        () => {
          api.value = false
          userguides.value = false
          developer.value = false
        }
      )
    })
  }
  return {
    checkDocumentationAvailability,
  }
}
