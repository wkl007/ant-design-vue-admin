import { loadCookie, loadStorage } from '@/utils/cache'
import { ACCESS_TOKEN, LOGIN_STATUS, USER_INFO } from '@/utils/constants'

const state = {
  loginStatus: loadCookie(LOGIN_STATUS, false),
  accessToken: loadStorage(ACCESS_TOKEN, ''),
  userInfo: loadStorage(USER_INFO, {}),
  settings: {
    sidebar: true,
    device: 'desktop'
  },
  permission: {
    routers: [],
    addRouters: []
  }
}

export default state
