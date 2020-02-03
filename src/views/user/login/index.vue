<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit.stop="handleSubmit"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账户: admin"
          v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码: admin or ant.design"
          v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item style="margin-top: 24px;">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
        >确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (err) return
        const userInfo = {
          username: values.username.includes('admin') ? 'admin' : 'normal',
          avatarUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        }
        this.setLoginStatus(true)
        this.setAccessToken(`${values.username}Token`)
        this.setUserInfo(userInfo)
        this.$router.push({
          path: '/'
        })
      })
    },
    ...mapActions(['setLoginStatus', 'setUserInfo', 'setAccessToken'])
  }
}
</script>

<style scoped lang="less">
.main {
  .user-layout-login {
    .login-button {
      width: 100%;
      height: 40px;
      padding: 0 15px;
      font-size: 16px;
    }
  }
}
</style>
