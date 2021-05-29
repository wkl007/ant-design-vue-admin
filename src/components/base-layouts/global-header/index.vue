<template>
  <div :class="classNames">
    <span v-if="isMobile" :class="`${baseClassName}-logo`">
      <router-link :to="{ name: 'Index' }">
        <img :src="images.base_logo" alt="logo"/>
      </router-link>
    </span>
    <div v-if="isMobile || collapsedButton" :class="`${baseClassName}-collapsed-button`">
      <slot name="collapsedButton">
        <menu-unfold-outlined
          v-if="collapsed"
          @click="handleClick"
        />
        <menu-fold-outlined
          v-else
          @click="handleClick"
        />
      </slot>
    </div>
    <div v-if="layout === 'mix' && !isMobile" :class="`${baseClassName}-logo`">
      <router-link :to="{ name: 'Index' }">
        <img :src="images.base_logo" alt="logo"/>
        <h1>Admin Pro</h1>
      </router-link>
    </div>
    <div :style="{ flex: 1 }">
      <slot/>
    </div>
    <slot name="rightContent"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from 'vue'
import { injectProProvider } from '@/components'
import type { Layout, MenuTheme } from '@/types/store/app'

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    /** 导航模式 */
    layout: {
      type: String as PropType<Layout>,
      default: 'side'
    },
    /** 主题 */
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark'
    },
    /** 是否是移动端 */
    isMobile: {
      type: Boolean,
      default: false
    },
    /** 是否收缩 */
    collapsed: {
      type: Boolean,
      default: false
    },
    /** 是否展示收缩按钮 */
    collapsedButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['collapse'],
  setup (props, { emit }) {
    const { getPrefixCls } = injectProProvider()
    const baseClassName = getPrefixCls('global-header')

    const classNames = ref({
      [baseClassName]: true,
      [`${baseClassName}-layout-${props.layout}`]: props.layout
    })

    /** 收缩展开按钮点击 */
    function handleClick (): void {
      emit('collapse', !props.collapsed)
    }

    return {
      images: inject('images'),
      baseClassName,
      classNames,

      handleClick
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{pro-layout-global-header-prefix-cls} {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  background: @component-background;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  > * {
    height: 100%;
  }

  &-collapsed-button {
    display: flex;
    align-items: center;
    margin-left: 16px;
    font-size: 20px;
  }

  &-layout {
    &-mix {
      background-color: @layout-sider-background;

      .@{pro-layout-global-header-prefix-cls}-logo {
        h1 {
          color: @btn-primary-color;
        }
      }

      .anticon {
        color: @btn-primary-color;
      }
    }
  }

  &-logo {
    position: relative;
    overflow: hidden;

    a {
      display: flex;
      align-items: center;
      height: 100%;

      img {
        height: 28px;
      }

      h1 {
        height: 32px;
        margin: 0 0 0 12px;
        color: @primary-color;
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }
    }
  }

  &-menu {
    .anticon {
      margin-right: 8px;
    }

    .@{ant-prefix}-dropdown-menu-item {
      min-width: 160px;
    }
  }

  .dark {
    height: @pro-layout-header-height;

    .action {
      color: rgba(255, 255, 255, 0.85);

      > i {
        color: rgba(255, 255, 255, 0.85);
      }

      &:hover,
      &.opened {
        background: @primary-color;
      }

      .@{ant-prefix}-badge {
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }
}
</style>
