<template>
  <div class="main register">
    <h3>注册</h3>
    <a-form
      layout="vertical"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item v-bind="validateInfos.email">
        <a-input
          size="large"
          placeholder="邮箱"
          v-model:value="form.email"
        />
      </a-form-item>
      <a-popover
        placement="rightTop"
        trigger="focus"
        :get-popup-container="trigger => trigger.parentElement"
        v-model:visible="passwordLevelChecked"
      >
        <template v-slot:content>
          <div style="width: 240px;">
            <div :class="passwordLevelClass">
              强度：{{ passwordLevelName }}
            </div>
            <a-progress
              :percent="percent"
              :show-info="false"
              :stroke-color="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。建议输入字母、数字、特殊字符组合。</span>
            </div>
          </div>
        </template>
        <a-form-item v-bind="validateInfos.password">
          <a-input-password
            size="large"
            placeholder="至少6位密码，区分大小写"
            v-model:value="form.password"
            @focus="passwordLevelChecked=true"
          />
        </a-form-item>
      </a-popover>
      <a-form-item v-bind="validateInfos.confirmPassword">
        <a-input-password
          size="large"
          placeholder="确认密码"
          v-model:value="form.confirmPassword"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.mobile">
        <a-input
          size="large"
          placeholder="11 位手机号"
          v-model:value="form.mobile"
        >
          <template #addonBefore>
            <a-select size="large" default-value="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item v-bind="validateInfos.captcha">
            <a-input
              size="large"
              placeholder="验证码"
              v-model:value="form.captcha"
            >
              <template #prefix>
                <mail-outlined class="prefix-icon"/>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-button
            size="large"
            block
            @click="getCaptcha"
          >
            {{ (!smsSendBtn && '获取验证码') || `${time} s` }}
          </a-button>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          :loading="registerBtn"
          :disabled="registerBtn"
          html-type="submit"
          style="width: 50%;"
        >
          注册
        </a-button>
        <router-link
          class="login"
          to="/user/login"
          style="float: right; line-height: 40px;"
        >
          使用已有账户登录
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useForm } from 'ant-design-vue/es/form'
import { message, notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import UserServer from '@/api/user'
import MessageServer from '@/api/message'

const levelNames: Record<number, string> = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass: Record<number, string> = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor: Record<number, string> = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
let interval: number

export default defineComponent({
  name: 'Register',
  setup () {
    const router = useRouter()
    const state = reactive({
      time: 60,
      smsSendBtn: false,
      passwordLevel: 0,
      passwordLevelChecked: false,
      percent: 10,
      progressColor: '#FF0000',
      registerBtn: false
    })
    const form = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      captcha: ''
    })
    const rules = reactive({
      email: [
        { required: true, type: 'email', message: '请输入邮箱地址' }
      ],
      password: [
        { required: true, message: '至少6位密码，区分大小写' },
        {
          validator: (rule: any, value: any) => {
            return new Promise((resolve, reject) => {
              let level = 0

              // 判断这个字符串中有没有数字
              if (/[0-9]/.test(value)) {
                level++
              }
              // 判断字符串中有没有字母
              if (/[a-zA-Z]/.test(value)) {
                level++
              }
              // 判断字符串中有没有特殊符号
              if (/[^0-9a-zA-Z_]/.test(value)) {
                level++
              }
              state.passwordLevel = level
              state.percent = level * 30
              if (level >= 2) {
                if (level >= 3) {
                  state.percent = 100
                }
                resolve(null)
              } else {
                if (level === 0) {
                  state.percent = 10
                }
                reject(new Error('密码强度不够'))
              }
            })
          }
        }
      ],
      confirmPassword: [
        { required: true, message: '至少6位密码，区分大小写' },
        {
          validator: (rule: any, value: any) => {
            return new Promise((resolve, reject) => {
              const password = form.password
              if (!value) {
                reject(new Error('请输入密码'))
              }
              if (value && password && value.trim() !== password.trim()) {
                reject(new Error('两次密码不一致'))
              }
              resolve(null)
            })
          }
        }
      ],
      mobile: [
        { required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }
      ],
      captcha: [
        { required: true, message: '请输入验证码' }
      ]
    })
    const { validateInfos, validate } = useForm(form, rules)

    async function getCaptcha (e: Event) {
      try {
        e.preventDefault()
        const { mobile } = await validate('mobile')
        interval = setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60
            state.smsSendBtn = false
            clearInterval(interval)
          }
        }, 1000)
        const messageInfo = message.loading('验证码发送中...', 0)
        const { captcha } = await MessageServer.getSmsCaptcha({ mobile })
        setTimeout(messageInfo, 3000)
        notification.success({
          message: '提示',
          description: `验证码获取成功，您的验证码为：${captcha}`,
          duration: 8
        })
      } catch (e) {
        message.destroy()
        clearInterval(interval)
        state.time = 60
        state.smsSendBtn = false
      }
    }

    async function handleSubmit (e: Event) {
      try {
        e.preventDefault()
        state.registerBtn = true
        const values = await validate()
        const { data: { email } } = await UserServer.register(values)

        message.info('注册成功')
        await router.push({
          path: '/user/registerResult',
          query: {
            email
          }
        })
      } catch (e) {
        state.registerBtn = false
      }
    }

    return {
      ...toRefs(state),
      form,
      validateInfos,

      passwordLevelClass: computed(() => levelClass[state.passwordLevel]),
      passwordLevelName: computed(() => levelNames[state.passwordLevel]),
      passwordLevelColor: computed(() => levelColor[state.passwordLevel]),

      getCaptcha,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="less">
@import "~@/assets/styles/variables";

.register {
  h3 {
    margin-bottom: 20px;
  }

  .prefix-icon {
    color: @primary-color;
    font-size: @font-size-base;
  }
}
</style>
