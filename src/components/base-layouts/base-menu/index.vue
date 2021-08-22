<template>
  <a-menu
    :theme="theme"
    :mode="mode"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    v-bind="dynamicProps"
    @openChange="handleOpenChange"
    @select="handleSelect"
    @mouseenter="$emit('mouseenter',$event)"
    @mouseleave="$emit('mouseleave',$event)"
  >
    <template
      v-for="(menu,index) in menus"
      :key="index"
    >
      <transform-v-node
        v-if="(!menu.children?.length || menu.meta?.hideChildrenInMenu) && !menu.meta?.hideInMenu"
        :key="menu.path"
        :by="customItem"
        :opt="menu"
      >
        <a-menu-item
          :key="menu.path"
          @mouseenter="$emit('itemHover',{key:menu.path})"
        >
          <template #icon>
            <component
              v-if="menu.meta.icon"
              :is="menu.meta.icon"
              :key="menu.meta.icon"
            />
            <component
              v-else-if="collapsed && menu.meta.collapsedIcon"
              :is="menu.meta.collapsedIcon"
              :key="menu.meta.collapsedIcon"
            />
          </template>
          {{ menu.meta.title }}
        </a-menu-item>
      </transform-v-node>
      <sub-menu
        v-else-if="menu.children?.length"
        :menu="menu"
        :key="menu.path"
        :collapsed="collapsed"
        @itemHover="$emit('itemHover',$event)"
      />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import type { RouteProps } from '@/types/router'
import type { MenuTheme } from '@/types/store/app'
import SubMenu from './sub-menu.vue'

export const BaseMenuProps = {
  /** 菜单列表 */
  menus: {
    type: Array as PropType<RouteProps[]>,
    default: (): RouteProps[] => []
  },
  /** 菜单类型，现在支持垂直、水平、和内嵌模式三种 */
  mode: {
    type: String as PropType<'vertical' | 'vertical-right' | 'horizontal' | 'inline'>,
    default: 'inline'
  },
  /** 主题颜色 */
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark'
  },
  /** 菜单收缩/展开 */
  collapsed: {
    type: Boolean,
    default: false
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
  /** 自定义 item */
  customItem: {
    type: Function,
    default: undefined
  }
}

export default defineComponent({
  name: 'BaseMenu',
  components: {
    SubMenu
  },
  props: {
    ...BaseMenuProps
  },
  emits: ['update:openKeys', 'update:selectedKeys', 'mouseenter', 'mouseleave', 'itemHover'],
  setup (props, { emit }) {
    const dynamicProps = ref({ inlineCollapsed: props.mode === 'inline' ? props.collapsed : undefined })

    /** SubMenu 展开/关闭 */
    function handleOpenChange (openKeys: string[]): void {
      emit('update:openKeys', openKeys)
    }

    /** menu 选中 */
    function handleSelect (ctx: { [key: string]: any }): void {
      emit('update:selectedKeys', ctx.selectedKeys)
    }

    return {
      dynamicProps,

      handleOpenChange,
      handleSelect
    }
  }
})
</script>
