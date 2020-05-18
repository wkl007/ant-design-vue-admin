<template>
  <div class="main">
    <a-form
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-item prop="username">
        <a-input
          size="large"
          type="text"
          placeholder="账户: admin"
          v-decorator="['username',formOptions.username.options]"
          v-bind="inputProps"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item prop="password">
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码: admin or ant.design"
          v-decorator="['password',formOptions.password.options]"
          v-bind="inputProps"
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
          block
        >确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { INPUT_PROPS } from '@/utils/constants'

export default {
  name: 'Login',
  data () {
    return {
      inputProps: INPUT_PROPS,

      form: this.$form.createForm(this),
      formOptions: {
        username: {
          options: {
            rules: [{ whitespace: true, required: true, message: '请输入用户名！' }]
          }
        },
        password: {
          options: {
            rules: [{ whitespace: true, required: true, message: '请输入密码！' }]
          }
        }
      },

    }
  },
  methods: {
    handleSubmit () {
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
