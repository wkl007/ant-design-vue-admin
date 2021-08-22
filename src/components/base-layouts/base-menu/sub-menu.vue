<template>
  <a-sub-menu
    v-if="!menu.meta?.hideInMenu"
    :key="menu.path"
  >
    <template #icon>
      <component
        v-if="menu.meta.icon"
        :is="menu.meta.icon"
        :key="menu.meta.icon"
      />
      <component
        v-else-if="collapsed&&menu.meta.collapsedIcon"
        :is="menu.meta.collapsedIcon"
        :key="menu.meta.collapsedIcon"
      />
    </template>
    <template #title>
      {{ menu.meta.title }}
    </template>
    <template
      v-for="(item,index) in menu.children"
      :key="index"
    >
      <a-menu-item
        v-if="(!item.children?.length||item.meta?.hideChildrenInMenu)&&!item.meta?.hideInMenu"
        :key="item.path"
        @mouseenter="$emit('itemHover',{key:item.path})"
      >
        <template #icon>
          <component
            v-if="item.meta.icon"
            :is="item.meta.icon"
            :key="item.meta.icon"
          />
          <component
            v-else-if="collapsed&&item.meta.collapsedIcon"
            :is="item.meta.collapsedIcon"
            :key="item.meta.collapsedIcon"
          />
        </template>
        {{ item.meta.title }}
      </a-menu-item>
      <sub-menu
        v-else
        :menu="item"
        :key="item.path"
        :collapsed="collapsed"
        @itemHover="$emit('itemHover',$event)"
      />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { RouteProps } from '@/types/router'

export default defineComponent({
  name: 'SubMenu',
  props: {
    /** 菜单信息 */
    menu: {
      type: Object as PropType<RouteProps>,
      required: true
    },
    /** 收缩菜单 */
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['itemHover']
})
</script>
