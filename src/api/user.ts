import request from '@/utils/request'
import type { LoginReq, LoginResp, LogoutResp, RegisterReq, RegisterResp, UserInfoResp } from '@/types/api/user'

export default class UserServer {
  // 登录
  static login (data: LoginReq): Promise<LoginResp> {
    return request.request({
      url: '/login/account',
      method: 'post',
      data
    })
  }

  // 获取用户信息
  static getUserInfo (): Promise<UserInfoResp> {
    return request.request({
      url: '/currentUser',
      method: 'get'
    })
  }

  // 退出登录
  static logout (): Promise<LogoutResp> {
    return request.request({
      url: '/logout',
      method: 'post'
    })
  }

  // 注册
  static register (data: RegisterReq): Promise<RegisterResp> {
    return request.request({
      url: '/register',
      method: 'post',
      data
    })
  }
}
