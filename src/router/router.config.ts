import { defineAsyncComponent, h } from 'vue'
import type { MenuDataItem } from '@/types/router'
import { GlobalLayout, RouteView, UserLayout } from '@/layouts'
import { IconFont } from '@/components'

/**
 * 基础路由
 */
export const constantRoutes: MenuDataItem[] = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    redirect: '/user/login',
    meta: { title: 'Ant Design 是西湖区最具影响力的 Web 设计规范' },
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */'@/views/user/login.vue'),
        meta: { title: '账号密码登录' }
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */'@/views/user/register.vue'),
        meta: { title: '注册账号' }
      },
      {
        path: '/user/registerResult',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "register-result" */'@/views/user/register-result.vue'),
        meta: { title: '注册账号' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "404" */'@/views/exception/404.vue')
  }
]

const AsyncWorkplace = defineAsyncComponent(() => import(/* webpackChunkName: "workplace" */ '@/views/workplace/index.vue'))

/**
 * 异步路由
 */
export const asyncRoutes: Array<MenuDataItem> = [
  {
    path: '/',
    name: 'Index',
    component: GlobalLayout,
    redirect: '/workplace',
    children: [
      {
        path: '/workplace',
        name: 'Workplace',
        component: h(RouteView, {}, () => h(AsyncWorkplace)), // 一级菜单并且开启多标签需要作此处理
        meta: {
          icon: h(IconFont, { type: 'icon-facebook' }),
          title: '工作台',
          lock: true
        }
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: RouteView,
        redirect: '/dashboard/welcome',
        meta: {
          icon: 'HeartOutlined',
          title: '仪表盘'
        },
        children: [
          {
            path: '/dashboard/welcome',
            name: 'Welcome',
            component: () => import(/* webpackChunkName: "welcome" */ '@/views/dashboard/welcome/index.vue'),
            meta: {
              icon: 'HistoryOutlined',
              title: '欢迎页',
              keepAlive: false
            }
          }
        ]
      },
      // exception
      {
        path: '/exception',
        name: 'Exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: {
          title: '异常页',
          icon: 'WarningOutlined'
        },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "403" */ '@/views/exception/403.vue'),
            meta: {
              title: '403'
            }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "404" */ '@/views/exception/404.vue'),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "500" */ '@/views/exception/500.vue'),
            meta: { title: '500' }
          }
        ]
      }
    ]
  }
]
