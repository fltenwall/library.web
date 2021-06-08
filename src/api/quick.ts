import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface Quick {
  //  主键
  id?: number

  // 名称
  name?: string

  // 链接
  link?: string

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
export type DataPager = PagerResponseData<Quick>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/quick',
      method: 'get',
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: Quick): Promise<Result<Quick>> {
    return request<Result<Quick>>({
      url: '/epi/quick',
      method: 'post',
      data: item
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: Quick): Promise<Result<Quick>> {
    return request<Result<Quick>>({
      url: '/epi/quick/' + id,
      method: 'put',
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/quick/' + id,
      method: 'delete'
    })
  }
}
