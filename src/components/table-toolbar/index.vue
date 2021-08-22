<template>
  <div class="ant-pro-table-list-toolbar">
    <div class="ant-pro-table-list-toolbar-container">
      <div class="ant-pro-table-list-toolbar-title">
        {{ title }}
      </div>
      <div class="ant-pro-table-list-toolbar-right">
        <a-space align="center">
          <slot name="action"></slot>
        </a-space>
        <div class="ant-pro-table-list-toolbar-divider">
          <a-divider type="vertical"/>
        </div>
        <div class="ant-pro-table-list-toolbar-setting-item">
          <a-tooltip
            title="刷新"
            :get-popup-container="trigger => trigger.parentNode"
          >
            <reload-outlined @click="$emit('reload')"/>
          </a-tooltip>
        </div>
        <div class="ant-pro-table-list-toolbar-setting-item">
          <a-tooltip
            title="密度"
            :get-popup-container="trigger => trigger.parentNode"
          >
            <a-dropdown
              :trigger="['click']"
              placement="bottomRight"
              :get-popup-container="trigger => trigger.parentNode"
            >
              <column-height-outlined/>
              <template #overlay>
                <a-menu
                  style="width: 80px;"
                  :selected-keys="[tableSize]"
                  @click="({key})=>{
                    $emit('update:tableSize',key)
                  }"
                >
                  <a-menu-item key="default">
                    <a href="javascript:;">默认</a>
                  </a-menu-item>
                  <a-menu-item key="middle">
                    <a href="javascript:;">中等</a>
                  </a-menu-item>
                  <a-menu-item key="small">
                    <a href="javascript:;">紧凑</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
        </div>
        <div class="ant-pro-table-list-toolbar-setting-item">
          <a-popover
            placement="bottomRight"
            arrow-point-at-center
            trigger="click"
            overlay-class-name="ant-pro-table-column-setting-overlay"
            :get-popup-container="trigger => trigger.parentNode"
          >
            <template #title>
              <div class="ant-pro-table-column-setting-title">
                <a-checkbox
                  :checked="checkAll"
                  :indeterminate="indeterminate"
                  @change="({target:{checked}})=>{
                    $emit('update:checkAll',checked)
                    $emit('changeAll',{target:{checked}})
                  }"
                >
                  列展示
                </a-checkbox>
                <a href="javascript:;" @click="$emit('reset')">重置</a>
              </div>
            </template>
            <template #content>
              <span class="ant-pro-table-column-setting-list">
                <drag-container
                  lockAxis="y"
                  dragClass="ant-pro-table-drag-ghost"
                  dropClass="ant-pro-table-drop-ghost"
                  @drop="({removedIndex,addedIndex})=>$emit('move',removedIndex,addedIndex)"
                >
                  <draggable
                    v-for="(item) in columnItems"
                    :key="item.key"
                  >
                    <div class="ant-pro-table-column-setting-list-item">
                      <drag-icon/>
                      <a-checkbox
                        :checked="item.checked"
                        @change="$emit('change',$event,item)"
                      >
                        {{ item.label }}
                      </a-checkbox>
                    </div>
                  </draggable>
                </drag-container>
              </span>
            </template>
            <a-tooltip
              title="列设置"
              :get-popup-container="trigger => trigger.parentNode"
            >
              <setting-outlined/>
            </a-tooltip>
          </a-popover>
        </div>
        <div class="ant-pro-table-list-toolbar-setting-item">
          <a-tooltip
            :title="screenState?'退出全屏':'全屏'"
            :get-popup-container="trigger => trigger.parentNode"
          >
            <fullscreen-outlined
              v-if="!screenState"
              @click="$emit('setFull')"
            />
            <fullscreen-exit-outlined
              v-else
              @click="$emit('exitFull')"
            />
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Container as DragContainer, Draggable, DragIcon } from '@/components'
import { DynamicColumnItem } from '@/hooks/useTableColumn'

export default defineComponent({
  name: 'TableToolbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    screenState: {
      type: Boolean,
      default: false
    },
    tableSize: {
      type: String as PropType<'default' | 'middle' | 'small'>,
      default: 'middle'
    },
    checkAll: {
      type: Boolean,
      default: true
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    columnItems: {
      type: Array as PropType<DynamicColumnItem[]>,
      default: () => []
    }
  },
  components: {
    DragContainer,
    Draggable,
    DragIcon
  },
  emits: [
    'setFull',
    'exitFull',
    'reload',
    'reset',
    'change',
    'changeAll',
    'move',
    'update:tableSize',
    'update:checkAll'
  ]
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.@{pro-table-prefix-cls}-column-setting-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin-left: 4px;
}

.@{pro-table-prefix-cls}-column-setting-list-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 16px 4px 0;

  > span.anticon {
    padding-right: 6px;
    cursor: move;
  }

  .@{ant-prefix}-checkbox-wrapper {
    flex: 1;
    margin: 0;
  }
}

.@{pro-table-prefix-cls}-list-toolbar {
  overflow-x: auto;
  overflow-y: hidden;

  &-container {
    display: flex;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
    line-height: 64px;
  }

  &-left {
    display: flex;
    justify-content: flex-start;
  }

  &-right {
    display: flex;
    justify-content: flex-end;
  }

  &-title {
    color: @text-color;
    font-size: 16px;
    font-family: PingFangSC-Medium;
  }

  &-divider {
    margin-right: -8px;
    margin-left: 8px;
  }

  &-setting-item {
    margin-left: 16px;
    font-size: 16px;
    cursor: pointer;
  }
}

.@{pro-table-prefix-cls}-drag-ghost {
  box-shadow: 1px 1px 5px 2px @shadow-color;
  cursor: move;
  transition: 0.18s ease;
}

.@{pro-table-prefix-cls}-drop-ghost {
  box-shadow: 0 0 2px 5px rgba(0, 0, 0, 0);
}

.@{pro-table-prefix-cls}-column-drag-icon {
  color: @text-color-secondary;
}
</style>
