import type { App } from 'vue'
import type { MenuDataItem } from '@/types/router'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router/router.config'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        left: 0,
        top: 0
      }
    }
  }
})

/**
 * vue-router 配置
 * @param app
 */
export function setupRouter (app: App<Element>): void {
  app.use(router)
}

/**
 * 使用 meta.role 确定当前用户是否具有权限
 * @param roles 角色数组
 * @param route 路由信息
 */
export function hasPermission (roles: string[], route: MenuDataItem): boolean {
  if (route.meta?.roles) {
    return roles.some(role => {
      return route.meta?.roles?.includes(role)
    })
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes 异步路由
 * @param roles 角色数组
 */
export function filterAsyncRoutes (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
  const result: Array<RouteRecordRaw> = []
  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) temp.children = filterAsyncRoutes(temp.children, roles)
      result.push(temp)
    }
  })
  return result
}

/**
 * 获取可访问的路由
 * @param roles
 */
export function generateRoutes (roles: string[]): Promise<RouteRecordRaw[]> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let accessedRoutes: Array<RouteRecordRaw> = []
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      resolve(accessedRoutes)
    } catch (err) {
      reject(err)
    }
  })
}

export default router
