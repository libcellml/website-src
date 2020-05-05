<template>
  <pre
    v-highlightjs="{ language: sourceLanguage, code: sourceCode }"
  ><code></code></pre>
</template>

<script>
import { decodeHTML } from '@/utils/utilities'

export default {
  name: 'LiteralBlock',
  props: {
    element: {
      type: Element,
    },
  },
  computed: {
    sourceLanguage() {
      let language = this.element.getAttribute('language')
      if (language === 'console' || language === 'default') {
        language = 'bash'
      } else if (language === 'text') {
        language = 'plaintext'
      }
      return language
    },
    sourceCode() {
      return decodeHTML(this.element.innerHTML)
    },
  },
}
</script>

<style scoped></style>
