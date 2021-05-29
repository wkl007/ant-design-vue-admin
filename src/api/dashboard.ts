import request from '@/utils/request'
import { ActivitiesResp, ChartDataResp, ProjectNoticeResp, TagsResp } from '@/types/api/dashboard'

export default class DashboardServer {
  // 进行中的项目
  static getProjectNotice (): Promise<ProjectNoticeResp[]> {
    return request.request({
      url: '/project/notice',
      method: 'get'
    })
  }

  // 动态
  static getActivities (): Promise<ActivitiesResp[]> {
    return request.request({
      url: '/activities',
      method: 'get'
    })
  }

  // 图表数据
  static getChartData (): Promise<ChartDataResp> {
    return request.request({
      url: '/fake_chart_data',
      method: 'get'
    })
  }

  // 热门搜索
  static getTags (): Promise<TagsResp> {
    return request.request({
      url: '/tags',
      method: 'get'
    })
  }
}
