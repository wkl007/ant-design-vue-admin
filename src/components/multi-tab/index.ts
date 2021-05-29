import {
  cloneVNode,
  createVNode,
  defineComponent,
  inject,
  KeepAlive,
  provide,
  reactive,
  toRaw,
  UnwrapRef,
  watch
} from 'vue'
import { RouteLocationNormalized, RouteRecordNormalized, useRoute, useRouter } from 'vue-router'
import { findLast } from 'lodash-es'
import { message } from 'ant-design-vue'
import { flattenChildren } from '@/utils/vnode-util'
import { generateUuid } from '@/utils'

export type CacheKey = string;

export interface CacheItem {
  /** 路由路径 */
  path: CacheKey;
  /** 路由元信息 */
  route: RouteLocationNormalized;
  /** 独一无二 uuid 用作路由名称 */
  key?: string;
  /** 是否锁定页签 */
  lock?: boolean;
  /** 标签标题 */
  tabTitle?: string;
  /** 标签路径 */
  tabPath?: string;
}

export interface MultiTabStore {
  /** 缓存列表 */
  cacheList: CacheItem[];
  /** 当前页面路径 */
  current: CacheKey;
  /** 只有名称匹配的组件会被缓存 */
  include: string[];
  /** 任何名称匹配的组件都不会被缓存 */
  exclude: string[];
}

export type CallerFunction = {
  /** 关闭页签 */
  close: (path: CacheKey) => void;
  /** 关闭左侧 */
  closeLeft: (selectedPath: CacheKey) => void;
  /** 关闭右侧 */
  closeRight: (selectedPath: CacheKey) => void;
  /** 关闭其他 */
  closeOther: (selectedPath: CacheKey) => void;
  /** 获取缓存 */
  getCaches: () => void;
  /** 清除缓存 */
  clearCache: (path: CacheKey) => void;
  /** 刷新 */
  refresh: (path?: CacheKey | undefined) => void;
}

export type MultiTabType = CallerFunction;

/**
 * 查找匹配路由
 * @param route
 */
function findMatchedRoute (route: RouteLocationNormalized): RouteRecordNormalized {
  const matched: RouteRecordNormalized[] = route.matched || []
  return (findLast(matched, m => m.meta?.mergeTab) as RouteRecordNormalized) || route
}

// const MULTI_TAB_STORE_KEY: InjectionKey<MultiTabStore> = Symbol('multiTabStore')
const MULTI_TAB_STORE_KEY = 'multiTabStore'

/**
 * 创建生产者
 * @param initCacheList
 */
export function useMultiTabStateProvider (initCacheList: Omit<CacheItem, 'component' | 'key'>[] = []): UnwrapRef<MultiTabStore> {
  // 定义保留的多标签状态
  const state = reactive<MultiTabStore>({
    cacheList: [],
    current: '',
    exclude: [],
    include: []
  })
  state.cacheList.push(...initCacheList.map(item => ({
    ...item,
    key: generateUuid()
  } as CacheItem)))

  provide(MULTI_TAB_STORE_KEY, state)

  return state
}

/**
 * 提供多标签数据
 */
export function injectMultiTabStore (): MultiTabStore {
  return inject(MULTI_TAB_STORE_KEY, {} as MultiTabStore)
}

/**
 * 创建消费端
 */
export const MultiTabStoreConsumer = defineComponent({
  name: 'MultiTabStoreConsumer',
  setup (props, { slots = {} }) {
    const route = useRoute()
    const state = injectMultiTabStore()

    watch(
      () => route.fullPath,
      () => {
        state.current = route.path
        const index = state.cacheList.findIndex(item => item.path === route.path)
        if (state.cacheList[index]) state.cacheList[index].route = { ...route }
      },
      { immediate: true }
    )

    /** 是否有缓存 */
    function hasCache (path: CacheKey): CacheItem | undefined {
      return state.cacheList.find(item => item.tabPath === path)
    }

    return () => {
      const component = flattenChildren((slots.default && slots.default()) || [])[0] as any
      if (!component) return null
      const tabRoute = findMatchedRoute(route)
      // 是否存在 cache
      let cacheItem = hasCache(tabRoute.path)
      if (!cacheItem) {
        cacheItem = {
          path: route.path,
          route: { ...route },
          key: generateUuid(),
          lock: !!route.meta.lock,
          tabTitle: tabRoute?.meta?.title as string,
          tabPath: tabRoute?.path
        }
        state.cacheList.push(cacheItem)
      } else if (cacheItem.path !== route.path) {
        // 处理 mergeTab 逻辑
        Object.assign(cacheItem, {
          path: route.path,
          route: { ...route },
          key: generateUuid(),
          lock: !!route.meta.lock,
          tabTitle: tabRoute?.meta?.title as string,
          tabPath: tabRoute?.path
        })
      }
      // 根据路由 meta 标签中是否有keepAlive来设置缓存
      if (!route.meta.keepAlive && state.exclude.indexOf(cacheItem.key as string) < 0) {
        state.exclude.push(cacheItem.key as string)
      }
      component.type.name = cacheItem.key
      return createVNode(
        KeepAlive,
        { exclude: state.exclude },
        {
          default: () => cloneVNode(component, { key: cacheItem?.key + route.fullPath })
        }
      )
    }
  }
})

/**
 * 多标签封装
 */
export function useMultiTab (): MultiTabType {
  const router = useRouter()
  const route = useRoute()
  const state = injectMultiTabStore()

  /** 清除缓存 */
  async function clearCache (path: CacheKey): Promise<void> {
    const cacheItem = state.cacheList.find(item => item.path === path)
    state.exclude = [cacheItem?.key as string]
    return new Promise<void>(resolve => {
      setTimeout(() => {
        state.exclude = []
        resolve()
      })
    })
  }

  /** 关闭页签 */
  async function close (path?: CacheKey): Promise<void> {
    if (!path) path = state.current
    const currentPageIndex = state.cacheList.findIndex(item => item.path === path)
    if (state.cacheList.length === 1) {
      message.info('这是最后一个标签了, 无法被关闭')
      return
    }
    await clearCache(path)
    if (path !== state.current) {
      state.cacheList.splice(currentPageIndex, 1)
      return
    }
    const targetIndex = currentPageIndex === 0 ? currentPageIndex + 1 : currentPageIndex - 1
    router
      .replace(state.cacheList[targetIndex].route)
      .then(() => { state.cacheList.splice(currentPageIndex, 1) })
      .catch()
  }

  /** 获取缓存 */
  function getCaches (): CacheItem[] {
    return state.cacheList
  }

  /** 刷新页面 */
  async function refresh (path?: CacheKey | undefined): Promise<void> {
    if (!path) path = state.current
    await clearCache(path)
    const cacheItemIndex = state.cacheList.findIndex(item => item.path === path)
    const cacheItem = state.cacheList[cacheItemIndex]

    state.cacheList[cacheItemIndex] = { ...toRaw(cacheItem), key: generateUuid() }

    return new Promise<void>(resolve => {
      router
        .replace(cacheItem?.route || { path })
        .finally(() => {
          // 模拟loading效果，加载太快，loading 不明显，主动加个延时 ，如不需要可删除延迟
          setTimeout(() => {
            resolve()
          }, 900)
        })
    })
  }

  /** 清除缓存 */
  function deleteCaches (start: number, num: number): void {
    const list = state.cacheList
    const end = start + num
    const newList = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (i < start || i >= end || item.lock) {
        newList.push(item)
      }
    }
    state.cacheList = newList
  }

  /** 关闭左侧 */
  function closeLeft (selectedPath: CacheKey): void {
    const index = state.cacheList.findIndex(item => item.path === selectedPath)
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path)
    if (currentIndex < index) {
      router
        .replace(state.cacheList[index].route)
        .then(() => {
          deleteCaches(0, index)
        })
        .catch()
    } else {
      deleteCaches(0, index)
    }
  }

  /** 关闭右侧 */
  function closeRight (selectedPath: CacheKey): void {
    const index = state.cacheList.findIndex(item => item.path === selectedPath)
    const currentIndex = state.cacheList.findIndex(item => item.path === route.path)
    if (currentIndex > index) {
      router
        .replace(state.cacheList[index].route)
        .then(() => {
          deleteCaches(index + 1, state.cacheList.length - index - 1)
        })
        .catch()
    } else {
      deleteCaches(index + 1, state.cacheList.length - index - 1)
    }
  }

  /** 关闭其他 */
  function closeOther (selectedPath: CacheKey): void {
    const index = state.cacheList.findIndex(cached => cached.path === selectedPath)
    router
      .replace(state.cacheList[index].route)
      .then(() => {
        deleteCaches(index + 1, state.cacheList.length - index - 1)
        deleteCaches(0, index)
      })
      .catch()
  }

  return {
    close,
    getCaches,
    clearCache,
    closeLeft,
    closeRight,
    closeOther,
    refresh
  }
}
