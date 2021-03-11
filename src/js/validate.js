import axios from 'axios'
const JSZip = require('jszip')

import Issue from 'libcellml.js'
import Parser from 'libcellml.js'


// Convert a string to XML Node Structure.
// Returns null on failure.
function validate(text) {
  try {
    let parser = Parser()
    let model = parser.parseModel(text)
    // return model.name()
    let i1 = Issue()
    let i2 = Issue()
    return [i1, i2]
    
  } catch (e) {
    // suppress
  }
}