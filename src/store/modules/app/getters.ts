import type { GetterTree } from 'vuex'
import type { RootState } from '@/types/store'
import type { AppState } from '@/types/store/app'

export const getters: GetterTree<AppState, RootState> = {
  lang: state => state.lang,
  device: state => state.device,
  layout: state => state.layout,
  navTheme: state => state.navTheme,
  contentWidth: state => state.contentWidth,
  fixedHeader: state => state.fixedHeader,
  fixedSidebar: state => state.fixedSidebar,
  menu: state => state.menu,
  splitMenus: state => state.splitMenus,
  title: state => state.title,
  primaryColor: state => state.primaryColor,
  colorWeak: state => state.colorWeak,
  transitionName: state => state.transitionName,
  multiTab: state => state.multiTab,
  multiTabFixed: state => state.multiTabFixed
}
