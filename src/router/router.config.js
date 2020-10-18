import { UserLayout, BasicLayout, BlankLayout, RouteView } from '@/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    name: 'User',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/user/login'),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

/**
 * 异步路由
 * @types { *[] }
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/project',
    children: [
      // 项目管理
      {
        path: '/project',
        name: 'Project',
        redirect: '/project/company',
        component: RouteView,
        meta: {
          title: '项目管理',
          keepAlive: false,
          icon: 'iconfont iconxuncha-shise'
        },
        children: [
          {
            path: '/project/company',
            name: 'Company',
            component: () => import(/* webpackChunkName: "company" */ '@/views/project/company'),
            meta: {
              title: '物业信息'
            }
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning' },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "exception403" */ '@/views/exception/403'),
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "exception404" */ '@/views/exception/404'),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "exception500" */ '@/views/exception/500'),
            meta: { title: '500' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
