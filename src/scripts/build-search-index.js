// scripts/build-search-index.js
import { glob } from 'glob'
import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import { getDocumentationVersions } from '../js/documentationversions.js'
import { t } from 'semver/internal/re.js'

// Configure the XML parser
const parser = new XMLParser({
  ignoreAttributes: false,
  // This is key: it flattens the text nodes for easy searching
  textNodeName: '_text',
})

// Helper function to recursively extract all text from a parsed XML node
function extractText(node) {
  if (typeof node === 'string') {
    return node + ' '
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }
  if (typeof node === 'object' && node !== null) {
    return Object.keys(node)
      .map((key) => extractText(node[key]))
      .join('')
  }
  return ''
}

async function buildIndex() {
  console.log('Starting to build search index...')

  // 1. Get the latest documentation version
  const versions = getDocumentationVersions()
  const latestVersionDir = 'public/generated/' + versions[0]

  // 2. Define all directories to be indexed
  const sourceDirs = [
    latestVersionDir,
    'public/generated/installation',
    'public/generated/theory',
  ]

  console.log('Indexing directories:', sourceDirs)

  const documents = []

  // 3. Find all XML files in all specified directories
  const globPromises = sourceDirs.map((dir) => glob(`${dir}/**/*.xml`))
  const allFileGroups = await Promise.all(globPromises)
  const files = allFileGroups.flat() // Flatten the array of arrays

  // 4. Process each file
  for (const file of files) {
    let title = 'Untitled'
    let content = ''
    let href = ''
    let orig = ''
    try {
      const fileContent = fs.readFileSync(file, 'utf-8')
      const parsedXml = parser.parse(fileContent)

      const sphinxDoc = parsedXml.document
      const doxygenDoc = parsedXml.doxygen
      if (sphinxDoc) {
        // --- SPHINX FORMAT ---
        // console.log('Processing Sphinx file:', sphinxDoc.section?.title)
        title = sphinxDoc.section?.title?._text || sphinxDoc.section?.title || sphinxDoc.title || 'Untitled Sphinx File'
        if (title === 'Untitled') {
          console.log('Sphinx doc probably and included doc:', file)
        }
        content = extractText(sphinxDoc.section || sphinxDoc.body || sphinxDoc)
        orig = file
        href =
        '/documentation' +
        file.replace('public/generated', '').replace('.xml', '')
      } else if (doxygenDoc) {
        // --- DOXYGEN FORMAT ---
        // The title is the compoundname
        console.log(
          'Processing Doxygen file:',
          doxygenDoc.compounddef?.innerclass?._text,
          doxygenDoc.compounddef?.innerclass,
        )
        // console.log('Doxygen doc file:', doxygenDoc)
        title =
          doxygenDoc?.compounddef?.innerclass?._text ||
          doxygenDoc?.compounddef?.innerclass ||
          'Untitled Doxygen File'

        console.log('Doxygen file:', file)
        orig = file
        href =
          '/documentation' +
          file
            .replace('public/generated','')
            .replace('.xml', '')
        // Content is in briefdescription and detaileddescription
        const brief = extractText(doxygenDoc?.compounddef?.briefdescription)
        const detailed = extractText(
          doxygenDoc?.compounddef?.detaileddescription,
        )
        content = brief + ' ' + detailed
      } else {
        // Neither format matched, skip this file
        console.warn(`Skipping file (unknown root element): ${file}`)
        continue
      }

      // Extract title (adjust selector if needed)
      // console.log('Processing file:', doc.section?.title)
      // if (!doc.section?.title) {
      //   console.log(doc.container?.container[1])
      //   console.warn(`No title found in ${file}, skipping.`)
      //   continue
      // }
      // const title = doc.section?.title?._text || doc.section?.title || 'Untitled'
      console.log('title:', title)

      // Extract all body content (adjust selector if needed)
      // const content = extractText(doc.section || doc.body || doc)

      // Create the URL that Vue Router will use
      // This generates a path like:
      // /documentation/generated/v0.6.3/api/my_class
      // /documentation/generated/installation/install_guide
      // /documentation/generated/theory/background
      

      documents.push({
        href: href,
        orig: file,
        title: title.trim(),
        // Clean up whitespace in content
        content: content.replace(/\s+/g, ' ').trim(),
      })
    } catch (e) {
      console.error(`Failed to parse ${file}:`, e.message)
    }
  }

  // 5. Write the final index to the public folder
  fs.writeFileSync('public/search-index.json', JSON.stringify(documents))

  console.log(
    `Search index built with ${documents.length} documents from ${sourceDirs.length} sources.`,
  )
}

buildIndex()
