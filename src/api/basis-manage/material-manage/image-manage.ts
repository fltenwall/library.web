import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface ImageManage {
  //  主键
  id?: string

  // 分类标题
  title?: string

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
export type DataPager = PagerResponseData<ImageManage>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthClassifyList(query?: PagerQueryData): Promise<Result<ImageManage[]>> {
    return request<Result<ImageManage[]>>({
      url: '/epi/material/image/classify',
      method: 'get',
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveClassifyNewItem(item: ImageManage): Promise<Result<ImageManage>> {
    return request<Result<ImageManage>>({
      url: '/epi/material/image/classify',
      method: 'post',
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<ImageManage>> {
    return request<Result<ImageManage>>({
      url: '/epi/date/' + id,
      method: 'get'
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: ImageManage): Promise<Result<ImageManage>> {
    return request<Result<ImageManage>>({
      url: '/epi/date/' + id,
      method: 'put',
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/date/' + id,
      method: 'delete'
    })
  }
}
