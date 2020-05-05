<script>
import { doxygenChildren } from '@/mixins/DoxygenChildren'

export default {
  name: 'BriefDescription',
  mixins: [doxygenChildren],
  props: {
    element: {
      type: Element,
    },
  },
  data() {
    return {
      tagName: 'span',
    }
  },
}
</script>

<style scoped></style>
