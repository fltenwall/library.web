import type { PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface OperatorRecord {
  //  主键
  id?: number

  // 用户名
  account?: string

  // ip
  ip?: string

  ipRecord?: {
    // 国家
    nation?: string
    // 省
    province?: string
    // 市
    city?: string
    // 区
    district?: string
  }

  // 方法
  method?: string

  // 参数
  param?: string

  // 路径
  path?: string

  // 客户端
  browser?: string

  // 操作系统
  os?: string

  // 描述
  description?: string

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
      url: '/epi/record/operator',
      method: 'get',
      params: query
    })
  }
}
