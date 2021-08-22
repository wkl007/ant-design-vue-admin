<template>
  <div v-if="!list.length" class="not-found">
    <img
      src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      alt="not found"
    />
    <div>{{ emptyText }}</div>
  </div>
  <div v-else>
    <a-list
      class="list"
      :data-source="list"
    >
      <template #renderItem="{item}">
        <a-list-item
          :class="{ item: true, read: item.read }"
          :key="item.key"
          @click="handleClick(item)"
        >
          <a-list-item-meta class="meta">
            <template v-if="item.avatar" #avatar>
              <a-avatar
                v-if="typeof item.avatar === 'string'"
                class="avatar"
                :src="item.avatar"
              />
              <span v-else class="icon-element">{{ item.avatar }}</span>
            </template>
            <template #title>
              <div class="title">
                {{ item.title }}
                <div class="extra">
                  <slot name="extra" v-bind="item">{{ item.extra }}</slot>
                </div>
              </div>
            </template>
            <template #description>
              <div>
                <div class="description">{{ item.description }}</div>
                <div class="datetime">{{ item.datetime }}</div>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <div v-if="showClear || showViewMore" class="bottom-bar">
      <div v-if="showClear" @click="$emit('clear')">{{ clearText }} {{ title }}</div>
      <div v-if="showViewMore" @click="$emit('viewMore')">
        {{ viewMoreText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { NoticeResp } from '@/types/api/notice'

export default defineComponent({
  name: 'NoticeList',
  props: {
    count: {
      type: Number,
      default: 0
    },
    showClear: {
      type: Boolean,
      default: false
    },
    showViewMore: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array as PropType<NoticeResp[]>,
      default: () => []
    },
    emptyText: {
      type: String,
      default: ''
    },
    clearText: {
      type: String,
      default: ''
    },
    viewMoreText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['itemClick', 'clear', 'viewMore'],
  setup (props, { emit }) {
    function handleClick (item: NoticeResp): void {
      emit('itemClick', item)
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.list {
  max-height: 400px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    padding-right: 24px;
    padding-left: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;

    .meta {
      width: 100%;
    }

    .avatar {
      margin-top: 4px;
      background: @component-background;
    }

    .icon-element {
      font-size: 32px;
    }

    &.read {
      opacity: 0.4;
    }

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      background: @primary-1;
    }

    .title {
      margin-bottom: 8px;
      font-weight: normal;
    }

    .description {
      font-size: 12px;
      line-height: @line-height-base;
    }

    .datetime {
      margin-top: 4px;
      font-size: 12px;
      line-height: @line-height-base;
    }

    .extra {
      float: right;
      margin-top: -1.5px;
      margin-right: 0;
      color: @text-color-secondary;
      font-weight: normal;
    }
  }

  .load-more {
    padding: 8px 0;
    color: @primary-6;
    text-align: center;
    cursor: pointer;

    &.loaded-all {
      color: rgba(0, 0, 0, 0.25);
      cursor: unset;
    }
  }
}

.not-found {
  padding: 73px 0 88px;
  color: @text-color-secondary;
  text-align: center;

  img {
    display: inline-block;
    height: 76px;
    margin-bottom: 16px;
  }
}

.bottom-bar {
  height: 46px;
  color: @text-color;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid @border-color-split;
  border-radius: 0 0 @border-radius-base @border-radius-base;
  transition: all 0.3s;

  div {
    display: inline-block;
    width: 50%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;

    &:only-child {
      width: 100%;
    }

    &:not(:only-child):last-child {
      border-left: 1px solid @border-color-split;
    }
  }
}
</style>
