<template>
  <a-list :split="false">
    <a-tooltip>
      <a-list-item>
        <span style="opacity: 1;">
          路由动画
        </span>
        <template #actions>
          <a-select
            size="small"
            :value="transitionName"
            style="width: 120px;"
            @select="handleChange('transition',$event)"
          >
            <a-select-option value="null">
              Null
            </a-select-option>
            <a-select-option value="slide-fadein-up">
              Slide Up
            </a-select-option>
            <a-select-option value="slide-fadein-right">
              Slide Right
            </a-select-option>
            <a-select-option value="fadein">
              Fade In
            </a-select-option>
            <a-select-option value="zoom-fadein">
              Zoom
            </a-select-option>
          </a-select>
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip>
      <a-list-item>
        <span style="opacity: 1;">
          多标签
        </span>
        <template #actions>
          <a-switch
            size="small"
            :checked="multiTab"
            @change="handleChange('multiTab', $event)"
          />
        </template>
      </a-list-item>
    </a-tooltip>

    <a-tooltip
      placement="left"
      title="固定多标签需要先开启多标签并且固定 Header"
    >
      <a-list-item>
        <span :style="{opacity:!multiTab ? 0.5 : 1 }">
          固定多标签
        </span>
        <template #actions>
          <a-switch
            size="small"
            :disabled="!multiTab&&!fixedHeader"
            :checked="multiTabFixed"
            @change="handleChange('multiTabFixed', $event)"
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
          色弱模式
        </span>
        <template #actions>
          <a-switch
            size="small"
            :checked="false"
            :disabled="true"
          />
        </template>
      </a-list-item>
    </a-tooltip>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Layout } from '@/types/store/app'

export default defineComponent({
  name: 'LayoutChangeOther',
  props: {
    layout: {
      type: String as PropType<Layout>,
      default: 'side'
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    transitionName: {
      type: String,
      default: ''
    },
    multiTab: {
      type: Boolean,
      default: true
    },
    multiTabFixed: {
      type: Boolean,
      default: false
    },
    weakMode: {
      type: Boolean,
      default: false
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
