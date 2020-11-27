import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import router, { resetRouter } from '@/router'
import { constantRouterMap, asyncRouterMap } from '@/router/router.config'
import store from '@/store'
import { filterAsyncRoutes, setPageTitle } from '@/utils'

import 'nprogress/nprogress.css'

const WHITE_LIST = ['/user/login'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = setPageTitle(to.meta.title)
  const { loginStatus, userInfo: { roles } } = store.getters
  if (loginStatus) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = roles && roles.length > 0
      if (hasRoles) {
        next()
        NProgress.done()
      } else {
        try {
          // 默认当前用户拥有管理员权限，此处代码不要注释或删除，会导致页面卡死
          const userInfo = store.getters.userInfo
          userInfo.roles = ['admin']

          const accessedRoutes = await generateRoutes(userInfo.roles) || []

          router.addRoutes(accessedRoutes)

          const redirect = decodeURIComponent(from.query.redirect || to.path)

          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }

          NProgress.done()
        } catch (err) {
          await store.dispatch('setLoginStatus', false)
          await store.dispatch('setAccessToken', '')
          await store.dispatch('setUserInfo', {})
          await store.dispatch('setPermission', {
            routers: [],
            addRouters: []
          })

          resetRouter()

          message.error(err || '系统错误')
          next({ path: '/user/login', query: { redirect: to.fullPath } })
          NProgress.done()
        }
      }
    }
  } else {
    if (WHITE_LIST.indexOf(to.path) >= 0) {
      next()
    } else {
      next({ path: '/user/login' })
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  processMobileSidebar()

  NProgress.done()
})

/**
 * 获取运行访问的路由
 * @param roles
 * @returns {Promise<any>}
 */
function generateRoutes (roles) {
  return new Promise(async (resolve, reject) => {
    try {
      let accessedRoutes = []
      if (roles.includes('admin')) {
        accessedRoutes = asyncRouterMap || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles)
      }

      const permission = {
        addRouters: accessedRoutes,
        routers: [...constantRouterMap, ...accessedRoutes]
      }
      await store.dispatch('setPermission', permission)
      resolve(accessedRoutes)
    } catch (err) {
      reject(err)
    }
  })
}

function processMobileSidebar () {
  const { settings: { device, sidebar } } = store.getters
  const settings = { ...store.getters.settings }
  if (device === 'mobile' && !sidebar) {
    settings.sidebar = true
    store.dispatch('setSettings', settings)
  }
}
