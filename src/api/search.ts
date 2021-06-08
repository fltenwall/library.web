import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface Search {
  // 主键
  id?: number

  // 编码
  code?: string

  // 书名
  name?: string

  // 国际标准书号(ISBN)
  isbn?: string

  // 作者
  author?: string

  // 出版社
  publisher?: string

  // 描述
  description?: string

  // 价格
  price?: number

  // 出版时间
  publicationTime?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  // 更新时间
  updateTime?: string
}

export interface Hot {
  // 数量
  count?: number

  // 名称
  name?: string
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<Search>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query: Partial<PagerQueryData>): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/search',
      method: 'get',
      params: query
    })
  }

  // 向服务查询数据并分页返回结果
  static fecthHotList(): Promise<Result<Hot[]>> {
    return request<Result<Hot[]>>({
      url: '/epi/record/search',
      method: 'get'
    })
  }

  // 向服务查询数据并分页返回结果
  static fecthTipList(query: { keyword: string }): Promise<Result<string[]>> {
    return request<Result<string[]>>({
      url: '/api/search/tip',
      method: 'get',
      params: query
    })
  }
}
