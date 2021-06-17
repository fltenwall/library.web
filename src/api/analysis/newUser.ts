import type { Result } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface NewUser {
  // 新用户
  newCount?: number
  // 总用户
  userCount?: number
}

export default class Service {
  // 向服务查询数据并分页返回结果
  static fetchUserCount(query: { endTime: string; startTime: string }): Promise<Result<NewUser>> {
    return request<Result<NewUser>>({
      url: '/epi/user/count',
      method: 'get',
      params: query
    })
  }
}
