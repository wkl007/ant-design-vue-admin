<template>
  <div v-if="cacheListLength">
    <div class="ant-pro-multi-tab-fixed" v-if="fixed"></div>
    <a-tabs
      type="editable-card"
      v-bind="$attrs"
      :activeKey="activeKey"
      :style="{
        margin: 0,
        paddingTop: '6px',
        width: sideWidth,
      }"
      hide-add
      :class="{ 'ant-pro-multi-tab-wrap': true, 'ant-pro-multi-tab-wrap-fixed': fixed }"
      @change="handleActiveKeyChange"
    >
      <template #tabBarExtraContent>
        <a-dropdown>
          <ellipsis-outlined
            :rotate="90"
            class="ant-dropdown-link ant-pro-multi-tab-dropdown-menu-btn"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item
                key="close-other"
                @click="closeOther(route.path)"
                :disabled="cacheListLength === 1"
              >
                关闭其他
              </a-menu-item>
              <a-menu-item
                key="refresh"
                @click="handleReloadPage()"
              >
                刷新当前页
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-tab-pane
        class="contextmenu-wrap"
        v-for="(item, index) in store.cacheList"
        :key="item.route.path"
        :closable="false"
      >
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span class="ant-pro-multi-tab-title">
              {{ item.tabTitle ? item.tabTitle : item.route.meta.title }}
              <reload-outlined
                key="reload"
                v-if="store.current === item.route.path"
                class="ant-pro-multi-tab-reload-btn"
                :spin="spin"
                @click="handleReloadPage(item.route.path)"
              />
              <close-outlined
                key="close"
                v-if="cacheListLength > 1 && !item.lock"
                class="ant-pro-multi-tab-close-btn"
                @click="e => handleClose(e, item.route.path)"
              />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  :disabled="cacheListLength === 1"
                  key="close-other"
                  @click="closeOther(item.route.path)"
                >
                  关闭其他
                </a-menu-item>
                <a-menu-item
                  key="close-left"
                  :disabled="index === 0"
                  @click="closeLeft(item.route.path)"
                >
                  关闭到左侧
                </a-menu-item>
                <a-menu-item
                  :disabled="index + 1 === cacheListLength"
                  key="close-right"
                  @click="closeRight(item.route.path)"
                >
                  关闭到右侧
                </a-menu-item>
                <a-menu-item
                  @click="handleReloadPage(item.route.path)"
                >
                  刷新当前页
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { injectMenuState } from '@/hooks/use-menu-state'
import { injectMultiTabStore, injectProProvider, useMultiTab } from '@/components'

export default defineComponent({
  name: 'MultiTab',
  inheritAttrs: false,
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    defaultHomePage: {
      type: String,
      default: '/welcome'
    }
  },
  setup (props) {
    const route = useRoute()
    const store = injectMultiTabStore()
    const menuState = injectMenuState()
    const { isMobile } = menuState
    const cacheListLength = computed(() => (store ? store.cacheList.length : 0))
    const activeKey = computed(() => {
      return menuState.selectedKeys && menuState.selectedKeys.value[menuState.selectedKeys.value.length - 1]
    })

    const sideWidth = computed(() =>
      (menuState.sideWidth &&
        menuState.sideWidth.value &&
        !isMobile.value &&
        props.fixed &&
        `calc(100% - ${menuState.sideWidth.value}px)`) ||
      '100%'
    )
    const spin = ref(false)

    const { refresh, close, closeLeft, closeRight, closeOther } = useMultiTab()

    /** 切换面板的回调 */
    function handleActiveKeyChange (key: string): void {
      menuState.selectedKeys && (menuState.selectedKeys.value = [key])
    }

    /** 刷新页面 */
    async function handleReloadPage (key?: string) {
      spin.value = true
      await refresh(key)
      spin.value = false
    }

    /** 关闭单个标签 */
    function handleClose (e: Event, target: string): void {
      e.stopPropagation()
      close(target)
    }

    return {
      activeKey,
      route,
      store,
      spin,
      sideWidth,
      cacheListLength,

      handleActiveKeyChange,
      handleReloadPage,
      closeLeft,
      closeRight,
      closeOther,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.ant-pro-multi-tab-wrap {
  background: @component-background;
}

.ant-pro-multi-tab-wrap ::v-deep(.ant-tabs-bar) {
  padding-left: 16px;

  .ant-tabs-tab {
    padding: 0 !important;

    > div {
      display: flex;
    }

    .ant-pro-multi-tab-reload-btn,
    .ant-pro-multi-tab-close-btn {
      margin-right: 0;
      margin-left: 8px;
      color: @text-color-secondary;
      font-size: 12px;

      &:hover {
        color: @primary-color;
      }
    }
  }

  .ant-pro-multi-tab-title {
    padding: 0 16px;
  }
}

.ant-pro-multi-tab-fixed {
  width: 100%;
  height: 62px;
  background: transparent;
}

.ant-pro-multi-tab-wrap-fixed {
  position: fixed;
  top: @pro-layout-header-height;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 62px;
  transition: width 0.2s;
}

.ant-pro-multi-tab-dropdown-menu-btn {
  margin-right: 8px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: @primary-color;
  }
}

.ant-pro-multi-tab-reload-btn {
  margin-left: 8px;
  color: @text-color-secondary;
  font-size: 12px;

  &:hover {
    color: @primary-color;
  }
}
</style>
