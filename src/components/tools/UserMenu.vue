<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="userInfo.avatarUrl"/>
          <span>{{ userInfo.username }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { resetRouter } from '@/router'

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['setLoginStatus', 'setAccessToken', 'setPermission', 'setUserInfo']),
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          this.setLoginStatus(false)
          this.setAccessToken('')
          this.setUserInfo({})
          this.setPermission({
            routers: [],
            addRouters: []
          })
          resetRouter()
          this.$router.push(`/user/login?redirect=${this.$route.fullPath}`)
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
