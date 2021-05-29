import type { MutationTree } from 'vuex'
import type { UserState } from '@/types/store/user'
import * as types from './mutationTypes'

export const mutations: MutationTree<UserState> = {
  [types.SET_LOGIN_STATUS] (state, loginStatus) {
    state.loginStatus = loginStatus
  },
  [types.SET_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_ALLOW_ROUTERS] (state, allowRouters) {
    state.allowRouters = allowRouters
  }
}
