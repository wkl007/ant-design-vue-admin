import type { AppState } from '@/types/store/app'

export const state: AppState = {
  lang: 'zh-CN',
  device: 'desktop',
  layout: 'side',
  navTheme: 'dark',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixedSidebar: false,
  menu: { locale: false },
  splitMenus: false,
  title: 'Admin Pro',
  primaryColor: '#1890ff',
  colorWeak: false,
  transitionName: 'zoom-fadein',
  multiTab: true,
  multiTabFixed: false
}
