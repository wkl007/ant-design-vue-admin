<template>
  <div :class="`${prefixedClassName}-detail`">
    <div :class="`${prefixedClassName}-main`">
      <div :class="`${prefixedClassName}-row`">
        <div v-if="hasContent" :class="`${prefixedClassName}-content`">
          <slot name="content"/>
        </div>
        <div v-if="hasExtraContent" :class="`${prefixedClassName}-extraContent`">
          <slot name="extraContent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { injectProProvider } from '@/components'

export default defineComponent({
  name: 'PageHeaderContent',
  setup (props, { slots }) {
    const { getPrefixCls } = injectProProvider()
    const hasContent = slots.content
    const hasExtraContent = slots.extraContent

    return {
      hasContent,
      hasExtraContent,
      prefixedClassName: getPrefixCls('page-container')
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.@{pro-layout-page-container}-main {
  .@{pro-layout-page-container}-detail {
    display: flex;
  }

  .@{pro-layout-page-container}-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .@{pro-layout-page-container}-title-content {
    margin-bottom: 16px;
  }

  .@{pro-layout-page-container}-title,
  .@{pro-layout-page-container}-content {
    flex: auto;
  }

  .@{pro-layout-page-container}-extraContent,
  .@{pro-layout-page-container}-main {
    flex: 0 1 auto;
  }

  .@{pro-layout-page-container}-main {
    width: 100%;
  }

  .@{pro-layout-page-container}-title {
    margin-bottom: 16px;
  }

  .@{pro-layout-page-container}-logo {
    margin-bottom: 16px;
  }

  .@{pro-layout-page-container}-extraContent {
    min-width: 242px;
    margin-left: 88px;
    text-align: right;
  }
}

@media screen and (max-width: @screen-xl) {
  .@{pro-layout-page-container}-main {
    .@{pro-layout-page-container}-extraContent {
      margin-left: 44px;
    }
  }
}

@media screen and (max-width: @screen-lg) {
  .@{pro-layout-page-container}-main {
    .@{pro-layout-page-container}-extraContent {
      margin-left: 20px;
    }
  }
}

@media screen and (max-width: @screen-md) {
  .@{pro-layout-page-container}-main {
    .@{pro-layout-page-container}-action,
    .@{pro-layout-page-container}-extraContent {
      margin-top: 10px;
      margin-left: 0;
      text-align: left;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .@{pro-layout-page-container}-detail {
    display: block;
  }

  .@{pro-layout-page-container}-extraContent {
    margin-left: 0;
  }
}
</style>
