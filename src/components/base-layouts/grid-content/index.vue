<template>
  <div :class="{[prefixedCls]: true,  wide: wide, }">
    <div :class="childClassNames">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { injectProProvider } from '@/components'

export default defineComponent({
  name: 'GridContent',
  setup () {
    const { getPrefixCls, contentWidth } = injectProProvider()
    const prefixedCls = getPrefixCls('grid-content')

    const wide = computed(() => (contentWidth.value) === 'Fixed')
    const childClassNames = ref(`${prefixedCls}-children`)

    return {
      prefixedCls,
      wide,
      childClassNames
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.@{pro-layout-grid-content-prefix-cls} {
  width: 100%;

  &.wide {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
