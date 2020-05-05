<template>
  <component
    :is="component"
    :data="componentData"
    :name="defaultComponent ? componentType : undefined"
    :variant="defaultComponent ? componentSubDir : undefined"
  />
</template>

<script>
export default {
  name: 'DynamicComponent',
  props: {
    componentData: {
      type: Object,
      required: true,
    },
    componentType: {
      type: String,
      required: true,
    },
    componentSubDir: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      component: null,
      defaultComponent: false,
    }
  },
  computed: {
    loader() {
      if (!this.componentType) {
        return null
      }
      return () =>
        import(
          `@/components/${this.componentSubDir}/templates/${this.componentType}`
        )
    },
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(() => {
        this.defaultComponent = true
        this.component = () => import('@/components/Default')
      })
  },
}
</script>
