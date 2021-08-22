<template>
  <a-dropdown
    class="ant-pro-dropdown ant-pro-dropdown-action"
    placement="bottomRight"
    :trigger="['click']"
    overlay-class-name="pro-components-header-notice-icon-index-container"
    v-model:visible="visible"
  >
    <span :class="['notice-button',{opened:visible}]">
      <a-badge
        class="badge"
        style="box-shadow: none;"
        :count="count"
      >
        <slot name="bell">
          <bell-outlined class="icon"/>
        </slot>
      </a-badge>
    </span>
    <template #overlay>
      <div>
        <a-spin :spinning="loading" :delay="300">
          <slot/>
        </a-spin>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NoticeDropdown',
  props: {
    count: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const visible = ref(false)

    return {
      visible
    }
  }
})
</script>

<style scoped lang="less">
.popover {
  position: relative;
  width: 336px;
}

.notice-button {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}

.icon {
  padding: 4px;
  vertical-align: middle;
}

.badge {
  font-size: 16px;
}

.tabs {
  ::v-deep(.ant-tabs-nav-list) {
    margin: auto;
  }

  ::v-deep(.ant-tabs-nav-scroll) {
    text-align: center;
  }

  ::v-deep(.ant-tabs-bar) {
    margin-bottom: 0;
  }
}
</style>

<style lang="less">
@import "~@/assets/styles/variables";

.pro-components-header-notice-icon-index-container > * {
  position: relative;
  width: 336px;
  background-color: @popover-bg;
  border-radius: 4px;
  box-shadow: @shadow-1-down;
}

@media screen and (max-width: @screen-xs) {
  .pro-components-header-notice-icon-index-container {
    width: 100% !important;
  }

  .pro-components-header-notice-icon-index-container > * {
    width: 100% !important;
    border-radius: 0 !important;
  }
}
</style>
