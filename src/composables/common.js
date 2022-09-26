export function useCommon() {
  function fetchResource(version, resource) {
    const url = `/generated/${version}/${resource}`
    return fetch(url)
  }
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
  async function checkDownloadAvailability(version) {
    const response = await fetchResource(version, 'release_assets.json')
    return response.json().catch((result) => {})
  }
  return {
    checkDocumentationAvailability,
    checkDownloadAvailability,
  }
}
