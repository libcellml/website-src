import axios from 'axios'

// Convert a string to XML Node Structure
// Returns null on failure
function textToXML(text) {
  try {
    let xml = null

    if (window.DOMParser) {
      const parser = new DOMParser()
      xml = parser.parseFromString(text, 'text/xml')

      const found = xml.getElementsByTagName('parsererror')

      if (!found || !found.length || !found[0].childNodes.length) {
        return xml
      }

      return null
    } else {
      xml = new ActiveXObject('Microsoft.XMLDOM')

      xml.async = false
      xml.loadXML(text)

      return xml
    }
  } catch (e) {
    // suppress
  }
}

export async function getXslt() {
  const xsltLocation =
    'https://raw.githubusercontent.com/cellml/cellml1to2/master/cellml1to2.xsl'
  let xsl = null
  try {
    const response = await axios.get(xsltLocation)
    return response.data
  } catch (error) {
    return xsl
  }
}

export const translate = (content, transform) => {
  let resultDocument = null
  const xmlContent = textToXML(content)
  const xmlTransform = textToXML(transform)
  if (window.ActiveXObject) {
    resultDocument = xmlContent.transformNode(xmlTransform)
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    const xsltProcessor = new XSLTProcessor()
    xsltProcessor.importStylesheet(xmlTransform)
    resultDocument = xsltProcessor.transformToFragment(xmlContent, document)
  }

  return resultDocument
}
