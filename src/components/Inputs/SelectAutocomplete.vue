<template>
  <q-select
    v-bind="$attrs"
    :options="options"
    use-input
    @filter="filterFn"
  />
</template>

<script setup>
import { ref, useAttrs } from 'vue'
import { removerAcentos } from 'src/services/utils'

const attrs = useAttrs()
const props = defineProps({
  options: { type: Array, default() { return [] } },
})
const options = ref(props.options)

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = props.options
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = props.options.filter(e => removerAcentos(optionLabel(e).toLowerCase()).indexOf(needle) > -1)
  })
}

function optionLabel(e) {
  if (!attrs['option-label']) {
    return typeof e === 'object' ? e['label'] : e
  }
  if (typeof attrs['option-label'] === 'function') {
   return attrs['option-label'](e)
  }
  else if (typeof attrs['option-label'] === 'string') {
    return e[attrs['option-label']]
  }
}
</script>
