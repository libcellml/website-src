<script>
import { doxygenChildren } from '@/mixins/DoxygenChildren'

export default {
  name: 'DetailedDescription',
  mixins: [doxygenChildren],
  props: {
    element: {
      type: Element,
    },
  },
  data() {
    return {
      tagName: 'dd',
    }
  },
}
</script>

<style scoped></style>
