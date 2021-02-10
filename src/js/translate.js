import axios from 'axios'
const JSZip = require('jszip')

// Convert a string to XML Node Structure.
// Returns null on failure.
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

// Convert XML element to string.
function xmlToText(xml) {
  const serializer = new XMLSerializer()
  const documentFragmentString = serializer.serializeToString(xml)
  return documentFragmentString
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

  return xmlToText(resultDocument)
}

function parseXml(xmlStr) {
  return new window.DOMParser().parseFromString(xmlStr, 'text/xml')
}

function findCellMLFiles(doc) {
  let cellMLFiles = []
  const identifiers = [
    'http://identifiers.org/combine.specifications/cellml',
    'http://identifiers.org/combine.specifications/cellml.1.0',
    'http://identifiers.org/combine.specifications/cellml.1.1',
  ]
  for (const identifier of identifiers) {
    const result = doc.querySelectorAll(`content[format="${identifier}"]`)
    cellMLFiles.push(...result)
  }

  return cellMLFiles
}
export const translateOmex = async (content, transform) => {
  let resultDocument = null
  const archive = new JSZip()
  const zip = await archive.loadAsync(content, {
    base64: true,
    checkCRC32: true,
  })
  if (zip) {
    // will be called, even if content is corrupted
    const text = await zip.file('manifest.xml').async('string')
    if (text) {
      const doc = parseXml(text)
      const elements = findCellMLFiles(doc)
      for (const el of elements) {
        let cellMLFile = el.getAttribute('location')
        console.log(cellMLFile)
        if (cellMLFile.startsWith('./')) {
          cellMLFile = cellMLFile.substr(2)
        }
        const zippedFile = zip.file(cellMLFile)
        if (zippedFile) {
          const cellMLContent = await zippedFile.async('string')
          const transformedCellMLContent = translate(cellMLContent, transform)

          zip.file(cellMLFile, transformedCellMLContent)
        }
      }
    }
    resultDocument = await zip.generateAsync({
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    })
  }

  return resultDocument
}
