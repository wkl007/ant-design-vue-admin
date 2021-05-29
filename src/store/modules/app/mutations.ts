import type { MutationTree } from 'vuex'
import type { AppState, ContentWidth, Device, Lang, Layout, MenuTheme } from '@/types/store/app'
import * as types from './mutationTypes'

export const mutations: MutationTree<AppState> = {
  [types.SET_LANG] (state, lang: Lang) {
    state.lang = lang
  },
  [types.SET_DEVICE] (state, device: Device) {
    state.device = device
  },
  [types.SET_LAYOUT] (state, layout: Layout) {
    state.layout = layout
  },
  [types.SET_NAV_THEME] (state, navTheme: MenuTheme | 'realDark') {
    state.navTheme = navTheme
  },
  [types.SET_CONTENT_WIDTH] (state, contentWidth: ContentWidth) {
    state.contentWidth = contentWidth
  },
  [types.SET_FIXED_HEADER] (state, fixedHeader: boolean) {
    state.fixedHeader = fixedHeader
  },
  [types.SET_FIXED_SIDEBAR] (state, fixedSidebar: boolean) {
    state.fixedSidebar = fixedSidebar
  },
  [types.SET_SPLIT_MENUS] (state, splitMenus: boolean) {
    state.splitMenus = splitMenus
  },
  [types.SET_PRIMARY_COLOR] (state, primaryColor: string) {
    state.primaryColor = primaryColor
  },
  [types.SET_COLOR_WEAK] (state, colorWeak: boolean) {
    state.colorWeak = colorWeak
  },
  [types.SET_TRANSITION_NAME] (state, transitionName: string) {
    state.transitionName = transitionName
  },
  [types.SET_MULTI_TAB] (state, multiTab: boolean) {
    state.multiTab = multiTab
  },
  [types.SET_FIXED_MULTI_TAB] (state, multiTabFixed: boolean) {
    state.multiTabFixed = multiTabFixed
  }
}
