import type { PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface OperatorRecord {
  //  主键
  id?: number

  // 用户名
  userName?: string

  // ip
  ip?: string

  // 方法
  httpMethod?: string

  // 参数
  param?: string

  // 路径
  path?: string

  // 请求响应时间
  executionTime?: string

  // 客户端
  client?: string

  // 操作系统
  operatingSystem?: string

  // 后端方法名称
  signatureName?: string

  // 创建时间
  createTime?: string
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<OperatorRecord>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/api/logger/operator',
      method: 'get',
      params: query
    })
  }
}
