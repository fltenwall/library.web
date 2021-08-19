import type { Result } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';

export interface Visits {
  // 总数
  count?: number;
  // 当日访问量
  visit?: { time: string; count: number }[];
}

export default class Service {
  // 向服务查询数据并分页返回结果
  static fetchUserVisit(query: { endTime: string; startTime: string }): Promise<Result<Visits>> {
    return request<Result<Visits>>({
      url: '/epi/record/user/visit',
      method: 'get',
      params: query
    });
  }
}
