import { installVue3SphinxXml } from 'vue3-sphinx-xml'
import 'vue3-sphinx-xml/dist/vue3-sphinx-xml.css'

import { useAppPlugin } from './useAppPlugin'

/**
 * Install vue3-sphinx-xml (and with it KaTeX and highlight.js) the first time
 * a documentation page that renders Sphinx XML is opened.
 */
export function useSphinxXml() {
  useAppPlugin(installVue3SphinxXml)
}
