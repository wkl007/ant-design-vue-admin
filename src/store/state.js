import { loadCookie, loadSessionStorage, loadStorage } from '@/utils/cache'
import { ACCESS_TOKEN, LOGIN_STATUS, SETTINGS, USER_INFO } from '@/utils/constants'

const state = {
  loginStatus: loadCookie(LOGIN_STATUS, false),
  accessToken: loadStorage(ACCESS_TOKEN, ''),
  userInfo: loadStorage(USER_INFO, {}),
  settings: loadSessionStorage(SETTINGS, {
    sidebar: true,
    device: 'desktop'
  }),
  permission: {
    routers: [],
    addRouters: []
  }
}

export default state
