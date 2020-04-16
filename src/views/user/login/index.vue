<template>
  <div class="main">
    <a-form-model
      ref="formLogin"
      :model="form"
      :rules="rules"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item prop="username">
        <a-input
          size="large"
          type="text"
          placeholder="账户: admin"
          v-model="form.username"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码: admin or ant.design"
          v-model="form.password"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item style="margin-top: 24px;">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          block
        >确定
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入帐户名或邮箱地址', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.formLogin.validate(valid => {
        if (!valid) return
        const values = this.form
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
    resetForm () {
      this.$refs.formLogin.resetFields()
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
