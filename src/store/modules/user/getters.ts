import type { GetterTree } from 'vuex'
import type { RootState } from '@/types/store'
import type { UserState } from '@/types/store/user'

export const getters: GetterTree<UserState, RootState> = {
  loginStatus: state => state.loginStatus,
  accessToken: state => state.accessToken,
  userInfo: state => state.userInfo,
  allowRouters: state => state.allowRouters
}
