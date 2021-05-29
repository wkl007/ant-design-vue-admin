<template>
  <a-layout-content :class="classNames">
    <slot/>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { injectProProvider } from '@/components'

export default defineComponent({
  name: 'WrapContent',
  setup () {
    const { getPrefixCls } = injectProProvider()
    const prefixCls = getPrefixCls('basic-layout')

    const classNames = ref({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-has-header`]: true
    })

    return {
      classNames
    }
  }
})
</script>
