<template>
  <a-form
    layout="vertical"
    :model="form"
    @submit="handleSubmit"
  >
    <a-form-item v-bind="validateInfos.username">
      <a-input
        size="large"
        v-model:value="form.username"
        placeholder="账户: admin"
      />
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password
        size="large"
        v-model:value="form.password"
        placeholder="密码: admin or ant.design"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        size="large"
        type="primary"
        html-type="submit"
        block
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useForm } from '@ant-design-vue/use'

export default defineComponent({
  name: 'App',
  setup () {
    const form = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [
        { required: true, message: '请输入帐户名' }
      ],
      password: [
        { required: true, message: '请输入密码' }
      ]
    })
    const { validateInfos, validate } = useForm(form, rules)

    async function handleSubmit (e: Event) {
      try {
        e.preventDefault()
        const values = await validate()
        console.log(values)
      } catch (e) {}
    }

    return {
      form,
      validateInfos,
      handleSubmit
    }
  }
})
</script>

<style lang="less">
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
