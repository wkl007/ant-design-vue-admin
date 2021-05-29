import type { UserInfo, UserState } from '@/types/store/user'
import { loadCookie, loadStorage } from '@/utils/cache'
import { ACCESS_TOKEN, LOGIN_STATUS, USER_INFO } from '@/utils/constants'

export const state: UserState = {
  loginStatus: Number(loadCookie(LOGIN_STATUS, '0')),
  accessToken: loadStorage(ACCESS_TOKEN, '') as string,
  userInfo: loadStorage(USER_INFO, {
    username: '',
    nickname: '',
    avatar: '',
    roles: [],
    extra: {}
  }) as UserInfo,
  allowRouters: []
}
