<template>
  <template v-if="computedMenus.length">
    <div
      v-if="fixed"
      class="ant-pro-fixed-stuff"
      :style="{ width: `${runtimeSideWidth}px`, overflow: 'hidden',flexShrink:0,transition:'width 0.2s'}"
    />
    <a-layout-sider
      v-bind="$attrs"
      :class="{
        [prefixCls]: true,
        [`${prefixCls}-${runtimeTheme}`]: true,
        [`${prefixCls}-${layout}`]: true,
        [`${prefixCls}-fixed`]: fixed,
      }"
      :breakpoint="breakpoint"
      :width="runtimeSideWidth"
      :collapsed="collapsed"
      :collapsible="false"
      :collapsed-width="collapsedWidth"
      :theme="runtimeTheme"
      :style="{
        overflow: 'hidden',
        paddingTop: isMix ? `${headerHeight}px` : undefined,
      }"
    >
      <div v-if="!isMix" class="ant-pro-sider-logo">
        <router-link :to="{ name: 'Index' }">
          <img :src="images.base_logo" alt="logo">
          <h1 v-if="!collapsed">Admin Pro</h1>
        </router-link>
      </div>
      <div style="flex: 1; overflow: hidden auto;">
        <slot name="header"/>
        <base-menu
          :theme="runtimeTheme"
          :menus="computedMenus"
          :collapsed="collapsed"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          :customItem="customItem"
          @update:openKeys="handleOpenKeys"
          @update:selectedKeys="handleSelectedKeys"
          @mouseenter="$emit('mouseenter', $event)"
          @mouseleave="$emit('mouseleave', $event)"
          @itemHover="$emit('itemHover', $event)"
        />
      </div>
      <div :class="`${prefixCls}-links`">
        <a-menu
          v-if="collapsedButton"
          :class="`${prefixCls}-link-menu`"
          :inline-indent="16"
          :theme="runtimeTheme"
          :selected-keys="[]"
          :open-keys="[]"
          mode="inline"
        >
          <a-menu-item
            key="collapsed-button"
            :class="`${prefixCls}-collapsed-button`"
            :title="null"
            @click="handleCollapse"
          >
            <template #icon>
              <slot name="collapsedButton">
                <menu-unfold-outlined v-if="collapsed"/>
                <menu-fold-outlined v-else/>
              </slot>
            </template>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { findMenuChildren } from '@/hooks/useMenuState'
import type { Layout, MenuTheme } from '@/types/store/app'
import type { RouteProps } from '@/types/router'
import { BaseMenu, injectProProvider } from '@/components'
import { BaseMenuProps } from '../base-menu/index.vue'

const SideMenuProps = Object.assign(
  {},
  BaseMenuProps,
  {
    /** 类名前缀 */
    prefixCls: {
      type: String,
      default: ''
    },
    /** 触发响应式布局的断点 */
    breakpoint: {
      type: String,
      default: 'lg'
    },
    /** 侧边菜单宽度 */
    sideWidth: {
      type: Number,
      default: 208
    },
    /** 自动分割菜单，只对 'mix' | 'side' 布局生效 */
    splitMenus: {
      type: Boolean,
      default: false
    },
    /** 是否展示收缩按钮 */
    collapsedButton: {
      type: Boolean,
      default: true
    },
    /** 收缩状态菜单宽度 */
    collapsedWidth: {
      type: Number,
      default: 48
    },
    /** header 高度 */
    headerHeight: {
      type: Number,
      default: 48
    },
    /** 菜单主题 */
    theme: {
      type: String as PropType<MenuTheme>,
      default: 'dark'
    },
    /** 导航模式 */
    layout: {
      type: String as PropType<Layout>,
      default: 'side'
    },
    /** 是否固定 */
    fixed: {
      type: Boolean,
      default: false
    },
    /** 是否可收起 */
    collapsible: {
      type: Boolean,
      default: false
    },
    /** 是否收缩 */
    collapsed: {
      type: Boolean,
      default: false
    },
    /** 自定义 item */
    customItem: {
      type: Function,
      default: undefined
    }
  }
)

export default defineComponent({
  name: 'SideMenu',
  inheritAttrs: false,
  components: {
    BaseMenu
  },
  props: SideMenuProps,
  emits: ['update:openKeys', 'update:selectedKeys', 'update:collapsed', 'mouseenter', 'mouseleave', 'itemHover'],
  setup (props, { emit }) {
    const { prefixCls: propPrefixCls, theme, layout, collapsed, collapsedWidth, sideWidth, splitMenus } = toRefs(props)
    const route = useRoute()
    const { getPrefixCls } = injectProProvider()
    const prefixCls = propPrefixCls.value || getPrefixCls('sider')
    const isMix = computed(() => layout.value === 'mix')
    const runtimeTheme = computed(() => (layout.value === 'mix' && 'light') || theme.value)
    const runtimeSideWidth = computed(() => collapsed.value ? collapsedWidth.value : sideWidth.value)
    const computedMenus = computed(() => splitMenus.value ? findMenuChildren(props.menus as RouteProps[], route.matched[1].name as string) : props.menus)

    /** menu 选中 */
    function handleSelectedKeys (selectedKeys: string[]): void {
      emit('update:selectedKeys', selectedKeys)
    }

    /** SubMenu 展开/关闭 */
    function handleOpenKeys (openKeys: string[]): void {
      emit('update:openKeys', openKeys)
    }

    /** 展开收缩 */
    function handleCollapse () {
      emit('update:collapsed', !collapsed.value)
    }

    return {
      images: inject('images'),
      prefixCls,
      isMix,
      runtimeTheme,
      runtimeSideWidth,
      computedMenus,

      handleSelectedKeys,
      handleOpenKeys,
      handleCollapse
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

@keyframes fade-in {
  0% {
    display: none;
    opacity: 0;
  }

  99% {
    display: none;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

.@{pro-layout-sider-menu-prefix-cls},
.@{pro-layout-sider-menu-left-prefix-cls} {
  //transition: background-color 0.3s;
  z-index: 9;
  background-color: @layout-sider-background;
  border-right: 0;

  &.@{ant-prefix}-layout-sider-collapsed {
    .@{ant-prefix}-menu-inline-collapsed {
      width: 48px;
    }

    .@{pro-layout-sider-menu-prefix-cls} {
      &-logo {
        padding: 16px 8px;
      }
    }
  }

  .@{ant-prefix}-menu-inline-collapsed {
    & > .@{ant-prefix}-menu-item .sider-menu-item-img + span,
    & > .@{ant-prefix}-menu-item-group > .@{ant-prefix}-menu-item-group-list > .@{ant-prefix}-menu-item .sider-menu-item-img + span,
    & > .@{ant-prefix}-menu-submenu > .@{ant-prefix}-menu-submenu-title .sider-menu-item-img + span {
      display: inline-block;
      max-width: 0;
      opacity: 0;
    }

    .@{ant-prefix}-menu-item {
      width: 48px;
      padding: 0 16px !important;
      text-align: center;
    }

    // hide menu item text in collapsed
    .@{ant-prefix}-pro-menu-item-title {
      display: none;
    }

    .@{ant-prefix}-menu-submenu {
      .@{ant-prefix}-menu-submenu-title {
        width: 48px;
        padding: 0 16px !important;
      }
    }
  }

  &.@{ant-prefix}-menu-vertical .@{ant-prefix}-menu-item:not(:last-child),
  &.@{ant-prefix}-menu-vertical-left .@{ant-prefix}-menu-item:not(:last-child),
  &.@{ant-prefix}-menu-vertical-right .@{ant-prefix}-menu-item:not(:last-child),
  &.@{ant-prefix}-menu-inline .@{ant-prefix}-menu-item:not(:last-child) {
    margin-bottom: 4px;
  }

  &.@{ant-prefix}-layout-sider-light {
    .@{ant-prefix}-menu-item a {
      color: @heading-color;
    }

    .@{ant-prefix}-menu-item-selected a,
    .@{ant-prefix}-menu-item a:hover {
      color: @primary-color;
    }
  }

  .@{ant-prefix}-menu-inline-collapsed > .@{ant-prefix}-menu-item .anticon + span,
  .@{ant-prefix}-menu-inline-collapsed > .@{ant-prefix}-menu-item-group > .@{ant-prefix}-menu-item-group-list > .@{ant-prefix}-menu-item .anticon + span,
  .@{ant-prefix}-menu-inline-collapsed > .@{ant-prefix}-menu-item-group > .@{ant-prefix}-menu-item-group-list > .@{ant-prefix}-menu-submenu > .@{ant-prefix}-menu-submenu-title .anticon + span,
  .@{ant-prefix}-menu-inline-collapsed > .@{ant-prefix}-menu-submenu > .@{ant-prefix}-menu-submenu-title .anticon + span {
    display: none;
  }

  ul.@{ant-prefix}-menu-sub {
    li.@{ant-prefix}-menu-item,
    li.@{ant-prefix}-menu-submenu {
      .@{ant-prefix}-pro-menu-item {
        padding-left: 8px;
      }
    }
  }

  .@{pro-layout-sider-menu-prefix-cls}-logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 16px;
    line-height: 32px;
    cursor: pointer;

    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
    }

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
      transition: height 0.2s;
    }

    h1 {
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      overflow: hidden;
      color: white;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
      animation: fade-in;
      animation-duration: 0.2s;
    }
  }

  &-extra {
    margin-bottom: 16px;
    padding: 0 16px;

    &-no-logo {
      margin-top: 16px;
    }
  }

  &-menu {
    position: relative;
    z-index: 10;
    min-height: 100%;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }

  .@{ant-prefix}-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, 0.05);
    }

    /* 滚动条滑块 */

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
    }
  }

  .@{ant-prefix}-menu-item,
  .@{ant-prefix}-menu-submenu-title {
    .anticon {
      transition: none;
    }
  }

  &-fixed {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    > .@{ant-prefix}-menu-root {
      :not(.@{pro-layout-sider-menu-prefix-cls}-link-menu) {
        height: ~'calc(100vh - @{pro-layout-header-height})';
        overflow-y: auto;
      }
    }
  }

  .@{ant-prefix}-menu-inline {
    .@{ant-prefix}-menu-item,
    .@{ant-prefix}-menu-submenu-title {
      width: 100%;
    }
  }

  &-light {
    .@{ant-prefix}-layout-sider-children {
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.06);
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
      }

      /* 滚动条滑块 */

      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.12);
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
      }
    }

    background-color: @component-background !important;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    .@{pro-layout-sider-menu-prefix-cls}-logo {
      h1 {
        color: @primary-color;
      }
    }

    .@{ant-prefix}-menu-light {
      border-right-color: transparent;
    }

    .@{pro-layout-sider-menu-prefix-cls}-collapsed-button {
      border-top: @border-width-base @border-style-base @border-color-split;
    }
  }

  &-icon {
    width: 14px;
    vertical-align: baseline;
  }

  &-links {
    width: 100%;

    ul.@{ant-prefix}-menu-root {
      height: auto;
    }
  }

  &-collapsed-button {
    border-top: @border-width-base @border-style-base rgba(0, 0, 0, 0.25);

    .anticon {
      font-size: 16px;
    }
  }

  .top-nav-menu li.@{ant-prefix}-menu-item {
    height: 100%;
    line-height: 1;
  }

  .drawer .drawer-content {
    background: @layout-sider-background;
  }

  .@{ant-prefix}-menu-item .sider-menu-item-img + span,
  .@{ant-prefix}-menu-submenu-title .sider-menu-item-img + span {
    opacity: 1;
    transition: opacity 0.3s @ease-in-out, width 0.3s @ease-in-out;
  }
}

.@{pro-layout-sider-menu-prefix-cls} {
  position: relative;

  &.ant-pro-has-left-menu {
    .@{pro-layout-sider-menu-prefix-cls}-logo {
      padding: 8px 16px;
    }
  }
}

.@{pro-layout-sider-menu-left-prefix-cls} {
  position: fixed;

  .@{pro-layout-sider-menu-prefix-cls}-logo {
    padding: 8px 16px !important;
  }
}
</style>
