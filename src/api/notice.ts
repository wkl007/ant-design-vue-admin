import request from '@/utils/request'
import type { NoticeResp } from '@/types/api/notice'

export default class NoticeServer {
  // 获取消息列表
  static getNoticeList (): Promise<NoticeResp[]> {
    return request.request({
      url: '/notices',
      method: 'get'
    })
  }
}
