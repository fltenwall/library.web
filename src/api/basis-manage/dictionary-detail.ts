import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface DictionaryDetail {
  //  主键
  id?: number

  // 类型
  type?: string

  // 状态
  state?: boolean | 1 | 0

  // 标签
  label?: string

  // 键值
  value?: string

  // 描述
  description?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  // 更新时间
  updateTime?: string
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<DictionaryDetail>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/dict-detail',
      method: 'get',
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: DictionaryDetail): Promise<Result<DictionaryDetail>> {
    return request<Result<DictionaryDetail>>({
      url: '/epi/dict-detail',
      method: 'post',
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<DictionaryDetail>> {
    return request<Result<DictionaryDetail>>({
      url: '/epi/dict-detail/' + id,
      method: 'get'
    })
  }

  // 通过类型取得数据
  static fecthListByType(type: string): Promise<Result<Array<DictionaryDetail>>> {
    return request<Result<Array<DictionaryDetail>>>({
      url: '/epi/dict-detail/all/type/' + type,
      method: 'get'
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: DictionaryDetail): Promise<Result<DictionaryDetail>> {
    return request<Result<DictionaryDetail>>({
      url: '/epi/dict-detail/' + id,
      method: 'put',
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/dict-detail/' + id,
      method: 'delete'
    })
  }
}
