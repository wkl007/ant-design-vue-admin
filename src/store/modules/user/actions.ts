import type { ActionTree } from 'vuex'
import type { RouteRecordRaw } from 'vue-router'
import type { RootState } from '@/types/store'
import type { UserInfo, UserState } from '@/types/store/user'
import * as types from './mutationTypes'
import { saveCookie, saveStorage } from '@/utils/cache'
import { ACCESS_TOKEN, LOGIN_STATUS, USER_INFO } from '@/utils/constants'

export const actions: ActionTree<UserState, RootState> = {
  /**
   * 设置登录态
   * @param commit
   * @param loginStatus
   */
  setLoginStatus ({ commit }, loginStatus: number) {
    commit(types.SET_LOGIN_STATUS, saveCookie(LOGIN_STATUS, String(loginStatus), { expires: 7 }))
  },
  /**
   * 设置token
   * @param commit
   * @param accessToken
   */
  setAccessToken ({ commit }, accessToken: string) {
    commit(types.SET_ACCESS_TOKEN, saveStorage(ACCESS_TOKEN, accessToken))
  },
  /**
   * 设置用户信息
   * @param commit
   * @param userInfo
   */
  setUserInfo ({ commit }, userInfo: UserInfo) {
    commit(types.SET_USER_INFO, saveStorage(USER_INFO, userInfo))
  },
  /**
   * 设置权限路由
   * @param commit
   * @param allowRouters
   */
  setAllowRouters ({ commit }, allowRouters: RouteRecordRaw[]) {
    commit(types.SET_ALLOW_ROUTERS, allowRouters)
  }
}
