<template>
  <div :class="classNames">
    <div :class="headerClassName">
      <div :class="`${prefixedClassName}-main-left`">
        <div :class="`${prefixedClassName}-logo`">
          <slot v-if="hasLogoSlot" name="logo"/>
          <div v-else>
            <router-link :to="{ name: 'Index' }">
              <img :src="images.base_logo" alt="logo"/>
              <h1>Admin Pro</h1>
            </router-link>
          </div>
        </div>
      </div>
      <div :style="{ flex: 1 }" :class="`${prefixedClassName}-menu`">
        <base-menu
          v-if="menus.length"
          mode="horizontal"
          :theme="theme"
          :menus="menus"
          :open-keys="openKeys"
          :selected-keys="selectedKeys"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
        />
      </div>
      <right-content>
        <slot name="rightContent"/>
      </right-content>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, toRefs } from 'vue'
import { BaseMenu, injectProProvider } from '@/components'
import type { RouteProps } from '@/types/router'
import type { Layout, MenuTheme } from '@/types/store/app'
import RightContent from './right-content.vue'

export default defineComponent({
  name: 'TopNavHeader',
  props: {
    /** 导航模式 */
    layout: {
      type: String as PropType<Layout>,
      default: 'side'
    },
    /** 菜单主题 */
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark'
    },
    /** 内容区域宽度 */
    contentWidth: {
      type: String,
      default: 'Fluid'
    },
    /** 菜单列表 */
    menus: {
      type: Array as PropType<RouteProps[]>,
      default: (): RouteProps[] => []
    },
    /** 当前展开的 SubMenu 菜单项 key 数组 */
    openKeys: {
      type: Array as PropType<string[]>,
      default: (): string[] => []
    },
    /** 当前选中的菜单项 key 数组 */
    selectedKeys: {
      type: Array as PropType<string[]>,
      default: (): string[] => []
    }
  },
  components: {
    BaseMenu,
    RightContent
  },
  emits: ['update:openKeys', 'update:selectedKeys'],
  setup (props, { slots, emit }) {
    const { theme, contentWidth } = toRefs(props)
    const { getPrefixCls } = injectProProvider()
    const prefixedClassName = getPrefixCls('top-nav-header')
    const hasMix = computed(() => props.layout === 'mix')
    const classNames = computed(() => {
      return {
        [prefixedClassName]: true,
        light: theme.value === 'light'
      }
    })
    const headerClassName = computed(() => {
      return {
        [`${prefixedClassName}-main`]: true,
        wide: contentWidth.value === 'Fixed'
      }
    })
    const { logo: hasLogoSlot } = slots

    /** menu 选中 */
    function handleSelectedKeys (selectedKeys: string[]): void {
      emit('update:selectedKeys', selectedKeys)
    }

    /** SubMenu 展开/关闭 */
    function handleOpenKeys (openKeys: string[]): void {
      emit('update:openKeys', openKeys)
    }

    return {
      images: inject('images'),
      classNames,
      headerClassName,
      prefixedClassName,
      hasMix,
      hasLogoSlot,

      handleSelectedKeys,
      handleOpenKeys
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{top-nav-header-prefix-cls} {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  transition: background 0.3s, width 0.2s;

  .@{ant-prefix}-menu {
    background: transparent;
  }

  .ant-menu {
    line-height: inherit;
  }

  .@{ant-prefix}-menu-submenu.@{ant-prefix}-menu-submenu-horizontal {
    height: 100%;

    .@{ant-prefix}-menu-submenu-title {
      height: 100%;
    }
  }

  &.light {
    background-color: @component-background;

    .@{top-nav-header-prefix-cls}-logo {
      h1 {
        color: @primary-color;
      }
    }

    .anticon {
      color: inherit;
    }
  }

  &-main {
    display: flex;
    height: 100%;
    padding-left: 16px;

    &-left {
      display: flex;
      min-width: 192px;
    }
  }

  .anticon {
    color: @btn-primary-color;
  }

  &-logo {
    position: relative;
    min-width: 165px;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s;

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }

    h1 {
      display: inline-block;
      margin: 0 0 0 12px;
      color: @btn-primary-color;
      font-weight: 400;
      font-size: 16px;
      vertical-align: top;
    }
  }

  &-menu {
    min-width: 0;

    .@{ant-prefix}-menu.@{ant-prefix}-menu-horizontal {
      height: 100%;
      border: none;
    }
  }
}
</style>
