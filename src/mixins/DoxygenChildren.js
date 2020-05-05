import { parseLinkedTextType } from '@/store/modules/doxygen'

const childLinkedText = node => {
  const item = parseLinkedTextType(node)
  return [
    'LinkedText',
    {
      props: {
        item,
      },
    },
  ]
}

const childDynamicComponent = node => {
  return [
    'DynamicComponent',
    {
      props: {
        componentData: {
          element: node,
        },
        componentType: node.nodeName,
        componentSubDir: 'doxygen',
      },
    },
  ]
}

export const doxygenChildren = {
  components: {
    DynamicComponent: () => import('@/components/DynamicComponent'),
    LinkedText: () => import('@/components/doxygen/LinkedText'),
  },
  props: {
    data: {
      type: Object,
    },
  },
  render(h) {
    return h(
      this.tagName, // tag name
      {
        class: this.classes,
      }, // options
      this.children.map(child => {
        if (typeof child === 'string') {
          return child
        }
        return h(child[0], child[1])
      }), // array of children
    )
  },
  computed: {
    classes() {
      return undefined
    },
    children() {
      let childElements = []
      this.element.childNodes.forEach(node => {
        let childElement = undefined
        if (node.nodeName === '#text') {
          childElement = node.nodeValue
        } else if (node.nodeName === 'ref') {
          childElement = childLinkedText(node)
        } else {
          childElement = childDynamicComponent(node)
        }
        childElements.push(childElement)
      })
      return childElements
    },
  },
}
