<template>
  <pro-provider>
    <a-layout class="ant-pro-left-menu-layout ant-pro-layout">
      <side-menu
        theme="dark"
        layout="left"
        prefix-cls="ant-pro-left-menu-sider"
        :fixed="true"
        :menus="mainMenus"
        :side-width="sideWidth"
        :collapsed-width="collapsedWidth"
        :open-keys="[]"
        v-model:collapsed="collapsed"
        :selected-keys="firstSelectedKeys"
        :customItem="customItem"
        @itemHover="handleItemHover"
        @mouseleave="handleMouseLeave"
        @update:selectedKeys="handleSelectedKeysChange"
      />
      <a-layout style="position: relative; flex-direction: column;">
        <header-view
          :is-mobile="isMobile"
          :theme="theme"
          :layout="layout"
          :menus="menus"
          :has-side-menu="true"
          :fixed-header="true"
          :split-menus="splitMenus"
          :collapsed-button="false"
          :collapsed-width="collapsed?collapsedWidth:sideWidth"
          :selected-keys="[]"
          :open-keys="[]"
        >
          <div style="text-align: right;">
            <avatar-dropdown :user-info="userInfo"/>
          </div>
        </header-view>
        <a-layout style="width: auto;">
          <side-menu
            :style="{
              zIndex: 7,
              position: 'fixed',
              left: `${collapsed ? collapsedWidth : sideWidth}px`,
            }"
            class="ant-pro-has-left-menu"
            theme="light"
            :layout="layout"
            :fixed="true"
            :menus="menus"
            :side-width="secondSideWidth"
            :split-menus="true"
            :collapsed-button="false"
            :collapsed="false"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
          />
          <section
            style="flex: auto; overflow-x: hidden;"
            class="ant-pro-layout-content"
          >
            <wrap-content>
              <router-view/>
              <slot/>
            </wrap-content>
            <global-footer/>
          </section>
        </a-layout>
        <div
          v-show="showHoverSideMenu"
          :style="{
            position: 'fixed',
            left: `${collapsed ? collapsedWidth : sideWidth}px`,
            zIndex: 8,
            height: '100%',
          }"
          @mouseenter="cancelSetMenuHover"
          @mouseleave="handleMouseLeave"
        >
          <side-menu
            :style="{ height: '100%' }"
            key="hoverMenu"
            class="ant-pro-has-left-menu"
            theme="light"
            :layout="layout"
            :fixed="false"
            :menus="secondMenus"
            :side-width="secondSideWidth"
            :collapsed-button="false"
            :collapsed="false"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
          />
        </div>
      </a-layout>
    </a-layout>
    <setting-drawer/>
  </pro-provider>
</template>

<script lang="ts">
import { cloneVNode, computed, defineComponent, ref, VNode, watch } from 'vue'
import { useStore } from 'vuex'
import { AvatarDropdown, GlobalFooter, HeaderView, SettingDrawer, SideMenu, WrapContent } from '@/components'
import { filterMenu, getMenuFirstChildren, getMenuInfo, injectMenuState } from '@/hooks/useMenuState'
import { useDelayReset } from '@/hooks/useDelayReset'

export default defineComponent({
  name: 'LeftMenuLayout',
  components: {
    SideMenu,
    HeaderView,
    AvatarDropdown,
    WrapContent,
    GlobalFooter,
    SettingDrawer
  },
  setup () {
    const store = useStore()
    const menuState = injectMenuState()
    const menus = computed(() => getMenuInfo(filterMenu(store.getters.allowRouters)).menus)
    const mainMenus = computed(() => getMenuFirstChildren(menus.value))
    const firstSelectedKeys = computed(() => {
      const key = menuState.selectedKeys?.value[0] || undefined
      return key ? [`/${key.split('/')[1]}`] : []
    })

    const userInfo = computed(() => store.getters.userInfo)

    const [menuHover, setMenuHover, cancelSetMenuHover] = useDelayReset(100)
    const hoverMenuKey = ref('')

    const secondMenus = computed(() => menus.value.find(m => m.path === hoverMenuKey.value)?.children || [])

    // 是否展示hover一级时，展示对应的二级菜单
    const showHoverSideMenu = computed(() => (
      menuHover.value &&
      !menuState.selectedKeys?.value.includes(hoverMenuKey.value) &&
      secondMenus.value &&
      secondMenus.value.length
    ))

    function handleItemHover ({ key }: { key: string }): void {
      cancelSetMenuHover()
      menuHover.value = true
      hoverMenuKey.value = key
    }

    function handleSelectedKeysChange (keys: string[]): void {
      const menu = menus.value.find(m => m.path === keys[0])
      const toKey = menu && menu.redirect ? [menu.redirect] : keys
      menuState.updateSelectKeys(toKey)
    }

    function handleMouseLeave (): void {
      setMenuHover(false)
    }

    function customItem (vNode: VNode, opt: any): VNode {
      return cloneVNode(vNode, {
        class: opt.path === hoverMenuKey.value ? 'hover-menu-active' : ''
      })
    }

    watch(menuHover, () => {
      if (!menuHover.value) {
        hoverMenuKey.value = ''
      }
    })

    return {
      menus,
      mainMenus,
      firstSelectedKeys,
      secondMenus,
      ...menuState,
      hoverMenuKey,
      collapsedFirst: ref(false),
      userInfo,

      cancelSetMenuHover,
      showHoverSideMenu,
      handleItemHover,
      handleSelectedKeysChange,
      handleMouseLeave,
      customItem
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{left-menu-layout-prefix-cls} {
  .hover-menu-active span {
    color: #fff;
  }

  .@{layout-prefix-cls}-content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  .menu-header-title {
    font-size: 16px;
  }
}
</style>
