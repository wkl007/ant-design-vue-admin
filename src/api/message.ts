import request from '@/utils/request'
import type { CaptchaReq, CaptchaResp } from '@/types/api/message'

export default class MessageServer {
  // 获取验证码
  static getSmsCaptcha (params: CaptchaReq): Promise<CaptchaResp> {
    return request.request({
      url: '/message/sms',
      method: 'get',
      params
    })
  }
}
