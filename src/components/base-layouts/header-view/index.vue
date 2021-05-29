<template>
  <a-layout-header
    v-if="needFixedHeader"
    :style="{
      height: `${headerHeight}px`,
      lineHeight: `${headerHeight}px`,
      background: 'transparent'
    }"
  />
  <a-layout-header
    :class="classNames"
    :style="{
      padding: 0,
      height: `${headerHeight}px`,
      lineHeight: `${headerHeight}px`,
      width,
      zIndex: isMix ? 99 : 9,
      right,
    }"
  >
    <top-nav-header
      v-if="(isTop || isMix) && !isMobile"
      mode="horizontal"
      :theme="theme"
      :layout="layout"
      :menus="needShowMenu ? computedMenus : []"
      :open-keys="openKeys"
      :selected-keys="splitMenus ? openKeys : selectedKeys"
      @update:openKeys="handleOpenKeys"
      @update:selectedKeys="handleSelectedKeys"
    >
      <template #rightContent>
        <slot/>
      </template>
    </top-nav-header>
    <global-header
      v-else
      :is-mobile="isMobile"
      :layout="layout"
      :collapsed="collapsed"
      :collapsed-button="collapsedButton"
      @collapse="handleCollapse"
    >
      <template #rightContent>
        <slot/>
      </template>
    </global-header>
  </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue'
import { injectProProvider } from '@/components'
import { getMenuFirstChildren } from '@/hooks/use-menu-state'
import type { Layout, MenuTheme } from '@/types/store/app'
import type { RouteProps } from '@/types/router'
import GlobalHeader from '../global-header/index.vue'
import TopNavHeader from '../top-nav-header/index.vue'

export default defineComponent({
  name: 'HeaderView',
  components: {
    GlobalHeader,
    TopNavHeader
  },
  props: {
    /** 是否是移动端 */
    isMobile: {
      type: Boolean,
      default: false
    },
    /** 固定 header */
    fixedHeader: {
      type: Boolean,
      default: false
    },
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
    },
    /** 有无侧边菜单 */
    hasSideMenu: {
      type: Boolean,
      default: false
    },
    /** 收缩菜单 */
    collapsed: {
      type: Boolean,
      default: (): boolean => false
    },
    /** 侧边菜单宽度 */
    sideWidth: {
      type: Number,
      default: 208
    },
    /** 收缩状态菜单宽度 */
    collapsedWidth: {
      type: Number,
      default: 48
    },
    /** 是否展示收缩菜单 */
    collapsedButton: {
      type: Boolean,
      default: true
    },
    /** header 高度 */
    headerHeight: {
      type: Number,
      default: 48
    },
    /** 自动分割菜单，只对 'mix' | 'side' 布局生效 */
    splitMenus: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:openKeys', 'update:selectedKeys', 'update:collapsed'],
  setup (props, { emit }) {
    const {
      collapsed,
      fixedHeader,
      hasSideMenu,
      sideWidth,
      collapsedWidth,
      splitMenus,
      isMobile
    } = toRefs(props)
    const { getPrefixCls } = injectProProvider()
    const prefixCls = getPrefixCls()
    const isMix = computed(() => props.layout === 'mix')
    const isTop = computed(() => props.layout === 'top')
    const isLeft = computed(() => props.layout === 'left')
    const needShowMenu = computed(() => (isMix.value ? splitMenus.value : true))
    const needFixedHeader = computed(() => fixedHeader.value || isMix.value)
    const needSettingWidth = computed(() => needFixedHeader.value && hasSideMenu.value && !isTop.value && !isMobile.value)
    const computedMenus = computed(() => splitMenus.value ? getMenuFirstChildren(props.menus) : props.menus)

    const classNames = ref({
      [`${prefixCls}-fixed-header`]: needFixedHeader,
      [`${prefixCls}-top-menu`]: isTop.value
    })
    const width = computed(() =>
      // 收起状态 或是 left 布局模式时，计算收起宽度
      !isMix.value && needSettingWidth.value && !isMobile.value
        ? `calc(100% - ${
          collapsed.value || isLeft.value ? collapsedWidth.value : sideWidth.value
        }px)`
        : '100%'
    )
    const right = computed(() => (needFixedHeader.value ? 0 : undefined))

    /** menu 选中 */
    function handleSelectedKeys (selectedKeys: string[]): void {
      emit('update:selectedKeys', selectedKeys)
    }

    /** SubMenu 展开/关闭 */
    function handleOpenKeys (openKeys: string[]): void {
      emit('update:openKeys', openKeys)
    }

    /** 收缩展开按钮点击 */
    function handleCollapse (collapsed: boolean): void {
      emit('update:collapsed', collapsed)
    }

    return {
      classNames,
      width,
      right,
      needFixedHeader,
      isTop,
      isMix,
      isLeft,
      needShowMenu,
      needSettingWidth,
      computedMenus,

      handleSelectedKeys,
      handleOpenKeys,
      handleCollapse
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.@{pro-layout-fixed-header-prefix-cls} {
  z-index: 9;
  width: 100%;
}
</style>
