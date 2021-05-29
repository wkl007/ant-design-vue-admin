<template>
  <pro-provider>
    <a-layout class="ant-pro-basic-layout ant-pro-layout">
      <a-drawer
        v-if="isMobile"
        placement="left"
        :body-style="{ padding: 0, height: '100%' }"
        :width="sideWidth"
        :closable="false"
        :visible="!collapsed"
        @update:visible="updateCollapsed"
      >
        <side-menu
          style="height: 100%;"
          :theme="theme"
          :layout="layout"
          :fixed="fixedSidebar"
          :menus="menus"
          :side-width="sideWidth"
          :split-menus="false"
          :collapsed-button="false"
          :collapsed="false"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
        />
      </a-drawer>
      <side-menu
        v-else-if="!hasTopMenu"
        :theme="theme"
        :layout="layout"
        :fixed="fixedSidebar"
        :menus="menus"
        :side-width="sideWidth"
        :split-menus="splitMenus"
        :collapsed-button="!splitMenus"
        v-model:collapsed="collapsed"
        v-model:open-keys="openKeys"
        v-model:selected-keys="selectedKeys"
      />
      <a-layout>
        <header-view
          :is-mobile="isMobile"
          :theme="theme"
          :layout="layout"
          :menus="menus"
          :side-width="sideWidth"
          :has-side-menu="hasSideMenu"
          :fixed-header="fixedHeader"
          :split-menus="splitMenus"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
        >
          <div style="text-align: right;">
            <avatar-dropdown :user-info="userInfo"/>
          </div>
        </header-view>
        <multi-tab
          v-if="multiTab"
          :fixed="multiTabFixed"
          :side-width="sideWidth"
        />
        <router-view v-slot="{Component}">
          <wrap-content>
            <component :is="Component"/>
          </wrap-content>
        </router-view>
        <global-footer/>
      </a-layout>
    </a-layout>
    <setting-drawer/>
  </pro-provider>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { AvatarDropdown, GlobalFooter, HeaderView, MultiTab, SettingDrawer, SideMenu, WrapContent } from '@/components'
import { filterMenu, getMenuInfo, injectMenuState } from '@/hooks/use-menu-state'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    SideMenu,
    HeaderView,
    AvatarDropdown,
    WrapContent,
    GlobalFooter,
    MultiTab,
    SettingDrawer
  },
  setup () {
    const store = useStore()
    const menuState = injectMenuState()
    const menus = computed(() => getMenuInfo(filterMenu(store.getters.allowRouters)).menus)

    const hasTopMenu = computed(() => menuState.layout.value === 'top')

    const userInfo = computed(() => store.getters.userInfo)

    return {
      ...menuState,
      menus,
      hasTopMenu,
      userInfo
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{layout-prefix-cls} {
  // BFC
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh !important;

  .@{ant-prefix}-layout-header {
    &.@{ant-prefix}-pro-fixed-header {
      position: fixed;
      top: 0;
      transition: width 0.2s;
    }
  }

  .@{basic-layout-prefix-cls}-content {
    position: relative;
    margin: 24px;

    .@{ant-prefix}-pro-page-container {
      margin: -24px -24px 0;
    }

    &-disable-margin {
      margin: 0;

      .@{ant-prefix}-pro-page-container {
        margin: 0;
      }
    }

    > .@{ant-prefix}-layout {
      max-height: 100%;
    }
  }

  // children should support fixed
  .@{layout-prefix-cls}-is-children.@{layout-prefix-cls}-fix-siderbar {
    height: 100vh;
    overflow: hidden;
    transform: rotate(0);
  }

  .@{layout-prefix-cls}-has-header {
    // tech-page-container
    .tech-page-container {
      height: calc(100vh - @pro-layout-header-height);
    }

    .@{layout-prefix-cls}-is-children.@{layout-prefix-cls}-has-header {
      .tech-page-container {
        height: calc(100vh - @pro-layout-header-height - @pro-layout-header-height);
      }

      .@{layout-prefix-cls}-is-children {
        min-height: calc(100vh - @pro-layout-header-height);

        &.@{layout-prefix-cls}-fix-siderbar {
          height: calc(100vh - @pro-layout-header-height);
        }
      }
    }
  }
}
</style>
