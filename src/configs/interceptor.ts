import NProgress from 'nprogress'
import router, { generateRoutes } from '@/router'
import store from '@/store'
import 'nprogress/nprogress.css'

const WHITE_LIST = ['/user/login', '/user/register', '/user/registerResult'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { loginStatus, userInfo: { roles } } = store.getters
  if (Number(loginStatus)) {
    const hasRoles = roles?.length
    if (hasRoles) {
      next()
    } else {
      const { userInfo } = store.getters
      userInfo.roles = ['user']

      const routes = await generateRoutes(userInfo.roles)
      await store.dispatch('setAllowRouters', routes)

      routes.forEach(route => {
        router.addRoute(route)
      })

      const redirect = decodeURIComponent(to.path)
      if (to.path === redirect) {
        next({ ...to, replace: true })
      } else {
        next({ path: redirect })
      }
    }
  } else {
    if (WHITE_LIST.indexOf(to.path) >= 0) {
      next()
    } else {
      next({ path: '/user/login', replace: true })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
