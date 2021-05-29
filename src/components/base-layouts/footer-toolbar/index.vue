<template>
  <div :class="baseClassName" :style="{width}">
    <div :class="`${baseClassName}-left`">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div :class="`${baseClassName}-right`">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, VNodeChild } from 'vue'
import { injectProProvider } from '@/components'
import { injectMenuState } from '@/hooks/use-menu-state'

export default defineComponent({
  name: 'FooterToolbar',
  props: {
    /** 额外元素 */
    extra: {
      type: [String, Object] as PropType<string | VNodeChild>,
      default: ''
    }
  },
  setup () {
    const { getPrefixCls } = injectProProvider()
    const { sideWidth, secondSideWidth, layout, isMobile } = injectMenuState()
    const baseClassName = getPrefixCls('footer-bar')

    const width = computed(() => {
      if (isMobile.value || !sideWidth.value) return '100%'
      const w = layout.value === 'left' ? sideWidth.value + secondSideWidth.value : sideWidth.value
      return `calc(100% - ${w}px)`
    })

    return {
      baseClassName,
      width
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.@{pro-footer-bar-prefix-cls} {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  line-height: 44px;
  background: @component-background;
  border-top: 1px solid @border-color-split;
  box-shadow: @shadow-1-up;
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &-left {
    flex: 1;
  }

  &-right {
    > * {
      margin-right: 8px;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
