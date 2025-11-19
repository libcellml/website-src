// scripts/build-search-index.js
import { glob } from 'glob'
import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import path from 'path'
import { getDocumentationVersions } from '../js/documentationversions.js'

// Configure the XML parser
const parser = new XMLParser({
  ignoreAttributes: false,
  // This is key: it flattens the text nodes for easy searching
  textNodeName: '_text',
  // Ensure arrays are created even for single elements, simplifying traversal
  isArray: (name, jpath, isLeafNode, isAttribute) => {
    // These are known to be arrays in Doxygen/Sphinx
    if (['compound', 'sectiondef', 'memberdef', 'param'].includes(name)) {
      return true
    }
    return false
  },
})

/**
 * Helper function to recursively extract all text from a parsed XML node.
 * @param {object|array|string} node - The node to parse.
 * @param {string[]} [excludeKeys=[]] - A list of XML tag names (keys) to exclude.
 */
function extractText(node, excludeKeys = []) {
  if (typeof node === 'string') {
    return node + ' '
  }
  if (Array.isArray(node)) {
    return node.map((n) => extractText(n, excludeKeys)).join('')
  }
  if (typeof node === 'object' && node !== null) {
    return Object.keys(node)
      .filter((key) => !excludeKeys.includes(key)) // Skip excluded keys
      .map((key) => extractText(node[key], excludeKeys))
      .join('')
  }
  return ''
}

/**
 * Helper function to extract rich content from a Doxygen XML object.
 * This now includes member names and descriptions.
 * @param {object} doxygenDoc - The parsed doxygen root object.
 * @param {function} textExtractor - The extractText function.
 */
function extractDoxygenContent(doxygenDoc, textExtractor) {
  const compound = doxygenDoc?.compounddef
  if (!compound) return ''

  let content = ''

  // 1. Compound's (class, struct, etc.) own description
  content += textExtractor(compound.briefdescription)
  content += textExtractor(compound.detaileddescription)

  // 2. Member descriptions (functions, variables, enums)
  const sectiondefs = [].concat(compound.sectiondef).filter(Boolean) // Robust array handling
  for (const section of sectiondefs) {
    const memberdefs = [].concat(section.memberdef).filter(Boolean)
    for (const member of memberdefs) {
      // Add the member's name (e.g., "myFunction", "myVariable")
      content += (member.name?._text || member.name || '') + ' '
      // Add the member's descriptions
      content += textExtractor(member.briefdescription)
      content += textExtractor(member.detaileddescription)

      // Add parameter names
      const params = [].concat(member.param).filter(Boolean)
      for (const param of params) {
        content += (param.declname?._text || param.declname || '') + ' '
      }
    }
  }
  return content
}

/**
 * Helper to build the Doxygen refid-to-name/kind map.
 * @param {string} doxygenXmlDir - Path to the Doxygen XML output directory.
 */
function buildDoxygenMap(doxygenXmlDir) {
  const doxygenIndexFile = path.join(doxygenXmlDir, 'index.xml')
  const compoundMap = new Map()

  try {
    const indexContent = fs.readFileSync(doxygenIndexFile, 'utf-8')
    const parsedIndex = parser.parse(indexContent)

    // Use robust array handling for compounds
    const compounds = []
      .concat(parsedIndex?.doxygenindex?.compound)
      .filter(Boolean)

    for (const compound of compounds) {
      const refid = compound['@_refid']
      const kind = compound['@_kind']
      const name = compound.name?._text || compound.name
      if (refid && kind && name) {
        compoundMap.set(refid, { name, kind })
      }
    }
    console.log(`Doxygen index parsed. Found ${compoundMap.size} compounds.`)
  } catch (e) {
    console.error(
      `Could not read or parse Doxygen index at ${doxygenIndexFile}. Doxygen indexing will be incomplete.`,
      e.message,
    )
  }
  return compoundMap
}

async function buildIndex() {
  console.log('Starting to build search index...')

  // 1. Get the latest documentation version
  const versions = getDocumentationVersions()
  const latestVersionDir = 'public/generated/' + versions[0]

  // 2. Build the Doxygen "refid" map
  // This solves your mapping problem. We assume Doxygen XML is in an 'api' subdir.
  const doxygenXmlDir = path.join(latestVersionDir, 'api')
  const doxygenCompoundMap = buildDoxygenMap(doxygenXmlDir)

  // 3. Define all directories to be indexed
  const sourceDirs = [
    latestVersionDir,
    'public/generated/installation',
    'public/generated/theory',
  ]
  const ignoreDirs = [
    // Add paths to directories containing snippets you want to exclude.
    // Use path.join for cross-platform compatibility.
    // Example: 'public/generated/theory/snippets',
    // Example: path.join(latestVersionDir, 'api', 'includes'),
    path.join(latestVersionDir, 'howto', 'resources', 'code_snippets'),
    path.join(latestVersionDir, 'howto', 'resources', 'snippets'),
    path.join(latestVersionDir, 'tutorials', 'resources', 'snippets'),
  ]

  console.log('Indexing directories:', sourceDirs)
  if (ignoreDirs.length > 0) {
    console.log('Ignoring directories:', ignoreDirs)
  }

  // Convert ignored dirs to glob ignore patterns
  // We normalize paths to use forward slashes, which glob requires
  const ignorePatterns = ignoreDirs.map((dir) =>
    path.join(dir, '**', '*.xml').replace(/\\/g, '/'),
  )

  const documents = []

  // 4. Find all XML files in all specified directories
  const globPromises = sourceDirs.map((dir) => {
    // Normalize the source directory path for glob
    const globPath = path.join(dir, '**', '*.xml').replace(/\\/g, '/')
    return glob(globPath, { ignore: ignorePatterns })
  })
  const allFileGroups = await Promise.all(globPromises)
  const files = allFileGroups.flat() // Flatten the array of arrays

  // 5. Process each file
  for (const file of files) {
    let title = 'Untitled'
    let content = ''
    let href = ''

    // Normalize file path for consistent URL generation
    const normalizedFile = path.normalize(file)

    try {
      const fileContent = fs.readFileSync(normalizedFile, 'utf-8')
      const parsedXml = parser.parse(fileContent)

      const sphinxDoc = parsedXml.document
      const doxygenDoc = parsedXml.doxygen

      if (sphinxDoc) {
        // --- SPHINX FORMAT ---
        title =
          sphinxDoc.title?._text ||
          sphinxDoc.section?.title?._text ||
          sphinxDoc.section?.title ||
          'Untitled Sphinx File'

        // Exclude noisy tags like code blocks and toctrees
        content = extractText(sphinxDoc, ['literal_block', 'toctree'])

        // Use normalized path separators (forward slashes) for URLs
        href =
          '/documentation' +
          normalizedFile
            .replace('public' + path.sep + 'generated', '')
            .replace('.xml', '')
            .replace(/\\/g, '/') // Ensure forward slashes for URL
      } else if (doxygenDoc) {
        // --- DOXYGEN FORMAT ---
        // Use the mapping from index.xml
        const fileRefId = path.basename(normalizedFile, '.xml')
        const compoundInfo = doxygenCompoundMap.get(fileRefId)

        // If not in the index map, it's not a primary compound (skip it)
        if (!compoundInfo) {
          // console.log(`Skipping Doxygen file (not in index): ${fileRefId}`)
          continue
        }

        // Skip kinds we don't want to index, like 'file' or 'dir'
        if (['file', 'dir'].includes(compoundInfo.kind)) {
          // console.log(`Skipping Doxygen file (kind: ${compoundInfo.kind}): ${fileRefId}`)
          continue
        }

        // Title is the correct compound name from the map
        title = compoundInfo.name

        // HREF is based on the refid/filename
        href =
          '/documentation' +
          normalizedFile
            .replace('public' + path.sep + 'generated', '')
            .replace('.xml', '')
            .replace(/\\/g, '/') // Ensure forward slashes for URL

        // Use content extraction function
        content = extractDoxygenContent(doxygenDoc, extractText)
      } else {
        // Neither format matched (e.g., index.xml, _dependencies.xml), skip this file
        // console.warn(`Skipping file (unknown root element): ${file}`)
        continue
      }

      // console.log('title:', title)

      documents.push({
        href: href,
        title: title.trim(),
        // Clean up whitespace in content
        content: content.replace(/\s+/g, ' ').trim(),
      })
    } catch (e) {
      console.error(`Failed to parse ${normalizedFile}:`, e.message)
    }
  }

  // 6. Write the final index to the public folder
  fs.writeFileSync('public/search-index.json', JSON.stringify(documents))

  console.log(
    `Search index built with ${documents.length} documents from ${sourceDirs.length} sources.`,
  )
}

buildIndex()
