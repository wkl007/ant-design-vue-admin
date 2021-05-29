import type { App } from 'vue'
import { createLogger, createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { user } from './modules/user'
import { app } from './modules/app'
import { APP_STATE, NODE_ENV } from '@/utils/constants'

// 调试工具，开发环境使用，线上关闭
const debug = NODE_ENV !== 'production'

// 持久化存储
const persistedPlugin = createPersistedState({
  key: APP_STATE,
  paths: ['app'],
  storage: window.localStorage
})

const store = createStore({
  modules: { user, app },
  plugins: debug ? [createLogger(), persistedPlugin] : []
})

/**
 * vuex 配置
 * @param app
 */
export function setupStore (app: App<Element>): void {
  app.use(store)
}

export default store
