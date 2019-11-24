import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import store from '@/store'
import { API_URL } from '@/utils/constants'

const request = axios.create({
  baseURL: API_URL,
  timeout: 60000
})

// http请求拦截器
request.interceptors.request.use(config => {
  const { accessToken, loginStatus } = store.getters
  if (loginStatus && accessToken) config.headers['Authorization'] = `JWT ${accessToken}`
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
request.interceptors.response.use(response => {
    const { errCode, errMsg, data, status } = response.data
    if (status === 1) {
      return data
    } else {
      if (errCode === 401 || errCode === 403) {
        Modal.error({
          title: '账号信息已经过期，请重新登录',
          okText: '确定',
          onOk: () => {
            store.dispatch('setLoginStatus', false)
            store.dispatch('setAccessToken', '')
            store.dispatch('setUserInfo', {})
            // 重新登录
            window.location.reload()
          }
        })
      } else {
        if (typeof (errMsg) === 'string') {
          message.error(errMsg)
        } else if (typeof (errMsg) === 'object') {
          const text = Object.values(errMsg)[0]
          const key = Object.keys(errMsg)[0]
          if (key && text) Message.error(`${key}${text}`)
        }
      }
      return Promise.reject(response.data)
    }
  },
  error => {
    const errorString = error.toString()
    if (errorString.includes('timeout')) {
      message.error('接口请求超时')
    } else if (errorString.includes('Network Error')) {
      message.error('网络故障，请稍后再试')
    } else {
      message.error(error.errMsg || '系统错误')
    }
    return Promise.reject(error)
  }
)

export default request
