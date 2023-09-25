export function useCommon() {
  function fetchResource(version, resource) {
    const url = `/generated/${version}/${resource}`
    return fetch(url)
  }
  function checkDocumentationAvailability(variable, version, name) {
    const url = `/generated/${version}/directories.json`
    return fetch(url).then((response) => {
      response.json().then(
        (content) => {
          variable.value = content.includes(name)
        },
        () => {
          variable.value = false
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
