import type { VNodeChild } from 'vue'
import { RouteMeta, RouteRecordRaw } from 'vue-router'

/** 外链跳转方式 */
export type Target = '_blank' | '_self' | unknown;

/** 路由 meta 信息 */
export interface MenuRouteMeta {
  /** 图标 */
  icon?: string | VNodeChild | JSX.Element;
  /** 当前路由在菜单中不展现 */
  hideInMenu?: boolean;
  /** 当前路由的子级在菜单中不展现 */
  hideChildrenInMenu?: boolean;
  /** 允许访问的角色 */
  roles?: string[];
  /** 外链跳转方式 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 是否缓存路由 */
  keepAlive?: boolean;
  /** 是否固定多页标签 */
  lock?: boolean;
  /** 合并标签 */
  mergeTab?: boolean;
}

/** 路由 */
export type MenuDataItem = {
  children?: Array<MenuDataItem>;
  meta?: MenuRouteMeta & RouteMeta
} & RouteRecordRaw

/** 菜单 meta 信息 */
export interface MetaRecord {
  /** 图标 */
  icon?: string | VNodeChild | JSX.Element;
  /** 收缩图标 */
  collapsedIcon?: string | VNodeChild | JSX.Element;
  /** 名称 */
  title?: string;
  /** 允许访问的角色 */
  roles?: string[];

  [key: string]: any;
}

/** 菜单 */
export interface RouteProps {
  /** 菜单独一标识 */
  key?: string | symbol;
  /** 路径 */
  path: string;
  /** 菜单路由名称  */
  name?: string | symbol;
  /** meta 信息 */
  meta?: MetaRecord;
  /** 外链跳转方式 */
  target?: Target;
  /** 子集 */
  children?: RouteProps[];
  /** 重定向地址 */
  redirect?: any;

  [key: string]: any;
}
