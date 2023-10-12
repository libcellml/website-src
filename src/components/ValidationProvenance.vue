<template>
   <span v-if="validationProvenanceIsKnown">
      This documentation was validated with
      <a :href="framework_url" target="_blank"> {{ framework_ref }}</a>
      of the end-2-end testing framework and
      <a :href="database_url" target="_blank"> {{ database_ref }}</a>
      of the end-2-end test database.
    </span>
    <span v-else>
      There is no known validation of this documentation with the libCellML
      library.
    </span>
    <span v-if="neverTrue"></span>
 </template>

<script setup>
import { computed, defineProps, toRefs, ref } from 'vue'

const props = defineProps({
  version: String,
})

const { version } = toRefs(props)
const validationProvenance = ref(defaultValidationProvenance())

const framework_url = computed(() => {
  return `https://github.com/${validationProvenance.value.testing_framework.project}/tree/${validationProvenance.value.testing_framework.reference}`
})
const database_url = computed(() => {
  return `https://github.com/${validationProvenance.value.testing_database.project}/tree/${validationProvenance.value.testing_database.reference}`
})
const framework_ref = computed(() => {
  return validationProvenance.value.testing_framework.reference
})
const database_ref = computed(() => {
  return validationProvenance.value.testing_database.reference
})

const neverTrue = computed(() => {
  const url = `/generated/${version.value}/validation_provenance.json`
  fetch(url).then((response) => {
    response.json().then(
      (content) => {
        validationProvenance.value = content
      },
      () => {
        validationProvenance.value = defaultValidationProvenance()
      },
    )
  })
  return false
})

const validationProvenanceIsKnown = computed(() => {
  return (
    validationProvenance.value.testing_framework.reference !== 'unknown' &&
    validationProvenance.value.testing_database.reference !== 'unknown'
  )
})

function defaultValidationProvenance() {
  return {
    testing_framework: { reference: 'unknown', project: 'unknown' },
    testing_database: { reference: 'unknown', project: 'unknown' },
  }
}
</script>
