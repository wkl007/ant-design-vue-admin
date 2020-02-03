import { removeCookie, removeStorage, saveCookie, saveSessionStorage, saveStorage } from '@/utils/cache'
import { ACCESS_TOKEN, LOGIN_STATUS, SETTINGS, USER_INFO } from '@/utils/constants'
import * as types from './mutationTypes'

/**
 * 设置登录状态
 * @param commit
 * @param state
 * @param query
 */
export const setLoginStatus = ({ commit, state }, query) => {
  if (!query) {
    removeCookie(LOGIN_STATUS)
  } else {
    const expires = new Date(+new Date() + 24 * 60 * 60 * 1000) // 24小时过期时间
    saveCookie(LOGIN_STATUS, query, { expires })
  }
  commit(types.SET_LOGIN_STATUS, query)
}

/**
 * 设置token
 * @param commit
 * @param state
 * @param query
 */
export const setAccessToken = ({ commit, state }, query) => {
  if (!query) {
    removeStorage(ACCESS_TOKEN)
  } else {
    saveStorage(ACCESS_TOKEN, query)
  }
  commit(types.SET_ACCESS_TOKEN, query)
}

/**
 * 设置用户信息
 * @param commit
 * @param state
 * @param query
 */
export const setUserInfo = ({ commit, state }, query) => {
  if (!query) {
    removeStorage(USER_INFO)
  } else {
    saveStorage(USER_INFO, query)
  }
  commit(types.SET_USER_INFO, query)
}

/**
 * 设置
 * @param commit
 * @param state
 * @param query
 */
export const setSettings = ({ commit, state }, query) => {
  commit(types.SET_SETTINGS, saveSessionStorage(SETTINGS, query))
}

/**
 * 设置权限路由
 * @param commit
 * @param state
 * @param query
 */
export const setPermission = ({ commit, state }, query) => {
  commit(types.SET_PERMISSION, query)
}
