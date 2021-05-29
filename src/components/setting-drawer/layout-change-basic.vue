<template>
  <a-list :split="false">
    <a-tooltip>
      <a-list-item>
        <span style="opacity: 1;">
          内容区域宽度
        </span>
        <template #actions>
          <a-select
            size="small"
            :value="contentWidth"
            @select="handleChange('contentWidth',$event)"
          >
            <a-select-option
              v-if="layout === 'side'"
              value="Fixed"
            >
              Fixed
            </a-select-option>
            <a-select-option value="Fluid">
              Fluid
            </a-select-option>
          </a-select>
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      :title="layout === 'mix' ? '混合模式必须开启固定 Header' : ''"
    >
      <a-list-item>
        <span style="opacity: 1;">
          固定 Header
        </span>
        <template #actions>
          <a-switch
            size="small"
            :checked="!!fixedHeader"
            :disabled="layout === 'mix'"
            @change="handleChange('fixedHeader', $event)"
          />
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      :title="layout === 'top' ? '侧边菜单布局时可配置' : ''"
    >
      <a-list-item>
        <span style="opacity: 1;">
          固定侧边菜单
        </span>
        <template #actions>
          <a-switch
            size="small"
            :disabled="layout === 'top'"
            :checked="!!fixedSidebar"
            @change="handleChange('fixSidebar', $event)"
          />
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      :title="layout === 'mix' ? '' : '将菜单分割成 Header 和 Side'"
    >
      <a-list-item>
        <span style="opacity: 1;">
          自动分割菜单
        </span>
        <template #actions>
          <a-switch
            size="small"
            :disabled="layout !== 'mix'"
            :checked="!!splitMenus"
            @change="handleChange('splitMenus', $event)"
          />
        </template>
      </a-list-item>
    </a-tooltip>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { injectProProvider } from '@/components'
import { ContentWidth, Layout } from '@/types/store/app'

export default defineComponent({
  name: 'LayoutChangeBasic',
  props: {
    contentWidth: {
      type: String as PropType<ContentWidth>,
      default: 'Fluid'
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    fixedSidebar: {
      type: Boolean,
      default: false
    },
    splitMenus: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String as PropType<Layout>,
      default: 'side'
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    /** 选择更改 */
    function handleChange (type: string, value: string): void {
      emit('change', { type, value })
    }

    return {
      handleChange
    }
  }
})
</script>
