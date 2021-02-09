import axios from 'axios'
// import * as zip from '@zip.js/zip.js'
// import * as zip from 'jszip'
const JSZip = require('jszip')
// const fs = require('fs')
// import {
//   ZipWriter,
//   BlobReader,
//   Data64URIWriter,
//   ZipReader,
// } from '@zip.js/zip.js'

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
      const elements = doc.querySelectorAll(
        'content[format="http://identifiers.org/combine.specifications/cellml"]',
      )
      for (const el of elements) {
        const cellMLFile = el.getAttribute('location')
        const zipLocation = cellMLFile.substr(2)
        const zippedFile = zip.file(zipLocation)
        if (zippedFile) {
          const cellMLContent = await zippedFile.async('string')
          const transformedCellMLContent = translate(cellMLContent, transform)

          zip.file(zipLocation, transformedCellMLContent)
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
