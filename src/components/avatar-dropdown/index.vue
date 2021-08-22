<template>
  <a-dropdown
    v-if="userInfo.nickname"
    class="ant-pro-dropdown ant-pro-dropdown-action"
    placement="bottomRight"
    overlayClassName="pro-components-header-dropdown-index-container"
  >
    <span>
      <a-avatar
        size="small"
        :src="userInfo.avatar"
        class="ant-pro-header-account-avatar"
      />
      <span
        class="ant-pro-header-account-name anticon"
      >
        {{ userInfo.nickname }}
      </span>
    </span>
    <template #overlay>
      <a-menu
        class="ant-pro-dropdown-menu"
        @click="handleMenuClick"
      >
        <template v-if="menu">
          <a-menu-item key="center">
            <template #icon>
              <user-outlined/>
            </template>
            个人中心
          </a-menu-item>
          <a-menu-item key="settings">
            <template #icon>
              <setting-outlined/>
            </template>
            个人设置
          </a-menu-item>
          <a-menu-divider/>
        </template>
        <a-menu-item key="logout">
          <template #icon>
            <logout-outlined/>
          </template>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'AvatarDropdown',
  props: {
    /** 用户信息 */
    userInfo: {
      type: Object,
      default: () => {}
    },
    /** 是否显示下拉菜单 */
    menu: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    /** 路由重置 */
    function resetRouter () {
      const { allowRouters } = store.getters
      allowRouters.forEach(({ name }: { name: string }) => {
        router.removeRoute(name)
      })
      // const route = router.getRoutes()
      // console.log(route)
    }

    /** 新页面 */
    function goPage (path: string): void {
      if (!path) return
      router.push({ path })
    }

    /** 退出登录 */
    async function handleLogout (): Promise<void> {
      try {
        await store.dispatch('setLoginStatus', 0)
        await store.dispatch('setAccessToken', '')
        await store.dispatch('setUserInfo', {})
        resetRouter()
        await store.dispatch('setAllowRouters', [])
        await router.replace({ path: '/user/login' })
      } catch (e) {}
    }

    /** menu点击 */
    function handleMenuClick ({ key }: { key: string }): void {
      switch (key) {
        case 'center':
          goPage('/account/center')
          break
        case 'settings':
          goPage('/account/settings')
          break
        case 'logout':
          handleLogout()
          break
      }
    }

    return {
      handleMenuClick
    }
  }
})
</script>

<style lang="less">
@import "~@/assets/styles/variables";

.@{pro-dropdown-prefix-cls} {
  display: inline-block;
  height: @pro-layout-header-height;
  line-height: @pro-layout-header-height;
  vertical-align: top;
  cursor: pointer;

  &.ant-pro-dropdown-action {
    padding: 0 12px;
    line-height: 48px;
    vertical-align: top;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  > span {
    font-size: 16px !important;
    transform: none !important;

    svg {
      position: relative;
      top: -1px;
    }
  }
}

.@{pro-dropdown-prefix-cls}-menu {
  ::v-deep(.anticon) {
    margin-right: 8px;
  }

  ::v-deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}

.ant-pro-global-header-layout-side,
.ant-pro-global-header-layout-left,
.ant-pro-top-nav-header.light {
  .@{pro-dropdown-prefix-cls} {
    &.ant-pro-dropdown-action {
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.ant-pro-header-account-name {
  vertical-align: unset;
}

.ant-pro-header-account-avatar {
  margin: 12px 8px 12px 0;
  color: @primary-color;
  vertical-align: top;
  background: hsla(0, 0%, 100%, 0.85);
}
</style>
