import { computed, ComputedRef, inject, onMounted, reactive, Ref, ref, toRefs, UnwrapRef, watch } from 'vue'
import { RouteLocationNormalized, RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import type { ContentWidth, Layout, MenuTheme } from '@/types/store/app'
import { xor } from 'lodash-es'
import { asyncRoutes } from '@/router/router.config'
import { RouteProps } from '@/types/router'
import { isUrl } from '@/utils'
import type { MultiTabStore } from '@/components/multi-tab'

export interface MenuState {
  /** 菜单是否收缩 */
  collapsed?: boolean;
  /** 当前选中的菜单项 key 数组 */
  selectedKeys?: string[];
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys?: string[];
  /** 当前路径 */
  current?: string;
  /** 移动端模式 */
  isMobile?: Ref<boolean>;
}

export interface Breadcrumb {
  /** 面包屑路径 */
  path: string;
  /** 名称 */
  breadcrumbName: string;
}

type LayoutState = {
  /** 导航模式 */
  layout: Ref<Layout>;
  /** 菜单主题 */
  theme: Ref<MenuTheme>;
  /** 内容区域宽度 */
  contentWidth: ComputedRef<ContentWidth>;
  /** 固定侧边菜单 */
  fixedSidebar: Ref<boolean>;
  /** 固定 header */
  fixedHeader: Ref<boolean>;
  /** 自动分割菜单，只对 'mix' | 'side' 布局生效 */
  splitMenus: Ref<boolean>;
  /** 路由动画 */
  transitionName: Ref<string>;
  /** 多标签 */
  multiTab: Ref<boolean>;
  /** 固定多标签 */
  multiTabFixed: Ref<boolean>;
}

interface MenuStated extends LayoutState {
  /** 移动端模式 */
  isMobile: Ref<boolean>;
  /** 有无侧边菜单 */
  hasSideMenu: ComputedRef<boolean>;
  /** 是否是顶部菜单 */
  isTopMenu: ComputedRef<boolean>;
  /** 侧边菜单宽度 */
  sideWidth: ComputedRef<number | undefined>;
  /** 二级侧边菜单宽度 */
  secondSideWidth: Ref<number>;
  /** 收缩状态菜单宽度 */
  collapsedWidth: number;
  /** 面包屑 */
  breadcrumb: Ref<Breadcrumb[]>;
  /** 菜单是否收缩 */
  collapsed: Ref<boolean | undefined> | undefined;
  /** 当前选中的菜单项 key 数组 */
  selectedKeys: Ref<string[]> | undefined;
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys: Ref<string[]> | undefined;
  /** 更新选中的菜单项 */
  updateSelectKeys: (keys: string[]) => void;
  /** 更新收缩/展开 */
  updateCollapsed: (collapsed: boolean) => void;
}

interface MenuMap {
  /** 菜单父级路径列表 */
  parentKeys?: string[];
}

type MenuKeyMap = Record<string, MenuMap>;

interface MenuInfo {
  /** 菜单数组 */
  menus: RouteProps[];
  /** 菜单 keys 列表 */
  menuKeyMap: MenuKeyMap;
}

const sideWidth = 208 // 侧边菜单宽度
const collapsedWidth = 48 // 收缩状态菜单宽度
const firstSideWidth = 140 // 左侧混合布局一级菜单宽度
const secondSideWidth = 160 // 左侧混合布局二级菜单宽度

const state = reactive<MenuState>({
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  current: undefined
})

let res: MenuStated | null = null

export const MENU_STATE_STORE_KEY = 'menuStateStore'

/**
 * 获取菜单信息
 * @param routes
 */
export function getMenuInfo (routes: RouteRecordRaw[]): MenuInfo {
  const menuKeyMap: MenuKeyMap = {}

  function generateMenuInfo (routes: RouteRecordRaw[], parentKeys: string[] = []): RouteProps[] {
    return routes.map(route => {
      const currentRouter: RouteProps = { ...route }
      menuKeyMap[currentRouter.path] = { parentKeys }
      if (route.meta?.hideChildrenInMenu) {
        route.children
          ?.map(item => item.path)
          .forEach(value => (menuKeyMap[value] = { parentKeys: [...parentKeys, currentRouter.path] }))
      }
      // 是否有子菜单，并递归处理
      if (route?.children?.length && !route.meta?.hideChildrenInMenu) {
        currentRouter.children = generateMenuInfo(route.children, [...parentKeys, currentRouter.path])
      } else {
        currentRouter.children = []
      }
      return currentRouter
    })
  }

  const menus = generateMenuInfo(routes, [])

  return {
    menus,
    menuKeyMap
  }
}

/**
 * 获取子菜单列表
 * @param menus
 */
export function getMenuFirstChildren (menus: RouteProps[]): RouteProps[] {
  return menus.map(menu => {
    const { children, ...rest } = menu
    return rest
  })
}

/**
 * 查找特定子菜单
 * @param menus
 * @param key
 */
export function findMenuChildren (menus: RouteProps[], key: string | symbol): RouteProps[] {
  return (menus?.find(item => item.name === key)?.children) || []
}

/**
 * 过滤菜单路由
 * @param routes
 */
export function filterMenu (routes: Array<RouteRecordRaw>): Array<RouteRecordRaw> {
  return routes.find(item => item.name === 'Index')?.children || []
}

/**
 * 获取菜单数据
 */
export function injectMenuState (): MenuStated {
  return inject(MENU_STATE_STORE_KEY, {} as MenuStated)
}

/**
 * 菜单状态管理 hooks
 * @param initialState
 * @param multiTabState
 */
export function useMenuState (initialState?: MenuState, multiTabState?: UnwrapRef<MultiTabStore>): MenuStated {
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  const isMobile = initialState?.isMobile || inject('isMobile', ref(false))
  Object.assign(state, res ? {} : initialState)

  const layoutState = reactive<LayoutState>({
    layout: computed(() => (isMobile.value ? 'side' : store.getters.layout)),
    theme: computed(() => {
      const { navTheme } = store.getters
      return navTheme === 'realDark' ? 'dark' : navTheme
    }),
    fixedSidebar: computed(() => store.getters.fixedSidebar),
    fixedHeader: computed(() => store.getters.fixedHeader),
    contentWidth: computed(() => store.getters.contentWidth),
    splitMenus: computed(() => store.getters.splitMenus),
    transitionName: computed(() => store.getters.transitionName),
    multiTab: computed(() => store.getters.multiTab),
    multiTabFixed: computed(() => store.getters.multiTabFixed)
  })

  const hasSideMenu = computed(() => layoutState.layout !== 'top')
  const isTopMenu = computed(() => layoutState.layout === 'top')

  const menuWidth = computed(() => {
    if (isMobile.value) return sideWidth
    const width = layoutState.layout === 'left' ? firstSideWidth : sideWidth
    return hasSideMenu.value ? (state.collapsed ? collapsedWidth : width) : 0
  })

  const { menuKeyMap } = getMenuInfo(filterMenu(asyncRoutes))

  const breadcrumb = ref<Breadcrumb[]>([])

  // 从多标签获取路由信息
  function getRouteInfoFromMultiTab (path: string): RouteLocationNormalized {
    const cacheList = multiTabState?.cacheList || []
    return cacheList.find(cache => cache.path === path)?.route as RouteLocationNormalized
  }

  // 获取展开的菜单
  function getOpenKeysBySelectKey (key: string): string[] {
    return menuKeyMap[key]?.parentKeys || []
  }

  // 更新菜单状态
  function updateMenuState (path: string) {
    const cachedKeys = getOpenKeysBySelectKey(path)
    state.selectedKeys = [...cachedKeys, path]
  }

  // 更新面包屑导航
  function updateBreadcrumb () {
    breadcrumb.value = route.matched.concat().map(r => {
      return {
        path: r.path,
        breadcrumbName: r.path === '/' ? '首页' : r.meta.title !== undefined ? r.meta.title as string : ''
      }
    })
  }

  // 更新选中菜单
  function updateSelectKeys (keys: string[]) {
    state.selectedKeys = keys
  }

  // 更新收缩展开状态
  function updateCollapsed (collapsed: boolean) {
    state.collapsed = !collapsed
  }

  // 设置展开菜单
  watch(
    () => state.collapsed,
    () => {
      if (state.collapsed && !isMobile.value) {
        state.openKeys = []
      } else {
        state.openKeys = getOpenKeysBySelectKey(route.path)
      }
    }
  )

  // 布局发生变化展开的菜单置空
  watch(
    [computed(() => layoutState.layout), computed(() => layoutState.splitMenus)],
    () => {
      state.openKeys = []
    }
  )

  watch(
    () => state.selectedKeys,
    (val, oldVal = []) => {
      if (state.selectedKeys) {
        if (isMobile.value) state.collapsed = true
        const path = state.selectedKeys[state.selectedKeys.length - 1]
        const isOtherUrl = isUrl(path)
        const isOtherUrlForOldVal = isUrl(oldVal[oldVal.length - 1])
        if (isOtherUrl) {
          const routes = router.getRoutes()
          const { target } = routes.find(r => r.path.includes(path))?.meta || {}
          state.selectedKeys = oldVal
          window.open(path, target as string)
          return
        }
        if (!state.collapsed &&
          layoutState.layout !== 'left' && (layoutState.layout === 'side' || layoutState.layout === 'mix' || layoutState.splitMenus) &&
          !isOtherUrlForOldVal
        ) {
          const openKeys = getOpenKeysBySelectKey(path)
          if (xor(state.openKeys, openKeys).length) {
            state.openKeys = openKeys || []
          }
        }

        router.isReady().then(() => {
          const routeInfo = getRouteInfoFromMultiTab(path) || { path }
          if (routeInfo.fullPath !== route.fullPath) {
            router.push(routeInfo)
          }
        })
      }
    }
  )

  onMounted(() => {
    watch(
      () => route.fullPath,
      () => {
        updateMenuState(route.path)
        updateBreadcrumb()
      }
    )
  })

  res = {
    ...toRefs(state),
    ...toRefs(layoutState),
    isMobile,
    hasSideMenu,
    isTopMenu,
    sideWidth: menuWidth,
    secondSideWidth: ref(secondSideWidth),
    breadcrumb,
    collapsedWidth,
    updateSelectKeys,
    updateCollapsed
  } as MenuStated

  return res
}
