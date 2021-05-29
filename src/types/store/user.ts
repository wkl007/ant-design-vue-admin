import type { RouteRecordRaw } from 'vue-router'

/** Action */
export enum Action {
  /** 新增 */
  ADD = 'add',
  /** 删除 */
  DELETE = 'delete',
  /** 更新 */
  UPDATE = 'update',
  /** 查询 */
  QUERY = 'query',
  /** 导入 */
  IMPORT = 'import',
  /** 导出 */
  EXPORT = 'export',
}

/** 权限 */
export interface Permission {
  /** 权限ID */
  id: string | number;
  /** 权限归属的角色 */
  roleId?: string | number;
  /** 权限名称 */
  name: string | undefined;
  /** 权限显示的名字 */
  label?: string | undefined;
  /** 权限拥有的操作 [增,删,改,查] */
  actions?: Action[];
}

/** 用户信息 */
export interface UserInfo {
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar: string;
  /** 角色 */
  roles?: string[];
  /** 扩展新 */
  extra: {
    [key: string]: any;
  }
}

/** User */
export interface UserState {
  /** 登录态 */
  loginStatus: number;
  /** accessToken */
  accessToken: string;
  /** 用户信息 */
  userInfo: UserInfo;
  /** 异步路由 */
  allowRouters: RouteRecordRaw []
}
