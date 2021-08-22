<template>
  <a-drawer
    :visible="visible"
    :width="300"
    style="z-index: 99;"
    placement="right"
    @close="setShow(false)"
  >
    <template #handle>
      <div
        :class="`${prefixCls}-handle`"
        @click="handleClickShowButton"
      >
        <close-outlined v-if="visible" :style="iconStyle"/>
        <setting-outlined v-else :style="iconStyle"/>
      </div>
    </template>

    <div :class="`${prefixCls}-content`">
      <body-wrapper title="整体风格设置">
        <block-checkbox
          :value="navTheme"
          :list="themeList"
          @change="val=>handleChange('theme',val)"
        />
      </body-wrapper>

      <a-divider/>

      <body-wrapper title="导航模式">
        <block-checkbox
          :value="layout"
          :list="layoutList"
          @change="val=>handleChange('layout',val)"
        />
      </body-wrapper>

      <layout-change-basic
        :content-width="contentWidth"
        :fixed-header="fixedHeader"
        :fixed-sidebar="fixedSidebar"
        :layout="layout"
        :split-menus="splitMenus"
        @change="({type,value})=>handleChange(type,value)"
      />

      <a-divider/>

      <body-wrapper title="其他设置">
        <layout-change-other
          :fixed-header="fixedHeader"
          :transition-name="transitionName"
          :multi-tab="multiTab"
          :multi-tab-fixed="multiTabFixed"
          :weak-mode="false"
          @change="({type,value})=>handleChange(type,value)"
        />
      </body-wrapper>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { injectProProvider } from '@/components'
import { injectMenuState } from '@/hooks/useMenuState'
import * as types from '@/store/modules/app/mutationTypes'
import type { Layout } from '@/types/store/app'
import BodyWrapper from './body-wrapper.vue'
import BlockCheckbox from './block-checkbox.vue'
import LayoutChangeBasic from './layout-change-basic.vue'
import LayoutChangeOther from './layout-change-other.vue'

const iconStyle = {
  color: '#fff',
  fontSize: '20px'
}

export default defineComponent({
  name: 'SettingDrawer',
  components: {
    BodyWrapper,
    BlockCheckbox,
    LayoutChangeBasic,
    LayoutChangeOther
  },
  setup () {
    const store = useStore()
    const menuState = injectMenuState()
    const { getPrefixCls } = injectProProvider()
    const prefixCls = getPrefixCls('setting-drawer')
    const visible = ref(false)
    const navTheme = computed(() => store.getters.navTheme)
    const layoutList = reactive([
      {
        key: 'side',
        title: '侧边菜单布局'
      },
      {
        key: 'top',
        title: '顶部菜单布局'
      },
      {
        key: 'mix',
        title: '混合布局'
      },
      {
        key: 'left',
        title: '左侧混合布局'
      }
    ])
    const themeList = reactive([
      {
        key: 'light',
        title: '亮色主题风格'
      },
      {
        key: 'dark',
        title: '暗色主题风格'
      },
      {
        key: 'realDark',
        title: '暗黑模式'
      }
    ])

    /** 抽屉展开/关闭 */
    function setShow (flag: boolean): void {
      visible.value = flag
    }

    /** 抽屉展开/关闭 */
    function handleClickShowButton (e: Event): void {
      if (e) visible.value = !visible.value
    }

    /** 更改layout */
    function updateLayoutSetting (layout: Layout): void {
      if (layout !== 'mix') {
        // 强制停止使用分割菜单
        store.commit(types.SET_SPLIT_MENUS, false)
      } else {
        // Mix 模式下，header 必须被锁定
        store.commit(types.SET_FIXED_HEADER, true)
      }
      store.commit(types.SET_LAYOUT, layout)
    }

    /** 设置更改 */
    function handleChange (type: string, val: string): void {
      console.log('change', type, val)
      switch (type) {
        case 'layout':
          updateLayoutSetting(val as Layout)
          break
        case 'theme':
          store.commit(types.SET_NAV_THEME, val)
          break
        case 'splitMenus':
          store.commit(types.SET_SPLIT_MENUS, val)
          break
        case 'fixSidebar':
          store.commit(types.SET_FIXED_SIDEBAR, val)
          break
        case 'fixedHeader':
          // 关闭 header 固定时，取消 multi-tab 固定
          if (!val) store.commit(types.SET_FIXED_MULTI_TAB, false)
          store.commit(types.SET_FIXED_HEADER, val)
          break
        case 'contentWidth':
          store.commit(types.SET_CONTENT_WIDTH, val)
          break
        case 'transition':
          store.commit(types.SET_TRANSITION_NAME, val || '')
          break
        case 'multiTab':
          store.commit(types.SET_MULTI_TAB, val)
          break
        case 'multiTabFixed':
          if (!menuState.fixedHeader) store.commit(types.SET_FIXED_HEADER, true)
          store.commit(types.SET_FIXED_MULTI_TAB, val)
          break
      }
    }

    return {
      navTheme,
      ...menuState,
      prefixCls,
      iconStyle,
      layoutList,
      themeList,
      visible,

      setShow,
      handleChange,
      handleClickShowButton
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{ant-pro-setting-drawer} {
  &-content {
    position: relative;
    min-height: 100%;

    .ant-list-item {
      span {
        flex: 1;
      }
    }
  }

  &-block-checkbox {
    display: flex;

    &-item {
      position: relative;
      margin-right: 16px;
      // box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      border-radius: @border-radius-base;
      cursor: pointer;

      img {
        width: 48px;
      }
    }

    &-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: @primary-color;
      font-weight: bold;
      font-size: 14px;

      .action {
        color: @primary-color;
      }
    }
  }

  &-color_block {
    display: inline-block;
    width: 38px;
    height: 22px;
    margin: 4px 12px 4px 4px;
    vertical-align: middle;
    border-radius: 4px;
    cursor: pointer;
  }

  &-title {
    margin-bottom: 12px;
    color: @heading-color;
    font-size: 14px;
    line-height: 22px;
  }

  &-handle {
    position: absolute;
    top: 240px;
    right: 300px;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    background: @primary-color;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
  }

  &-production-hint {
    margin-top: 16px;
    font-size: 12px;
  }
}
</style>
