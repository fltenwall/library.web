import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface RoleManage {
  //  主键
  id?: number

  // 名称
  name?: string

  // 是否是默认
  isDefault?: boolean | 1 | 0

  // 描述
  description?: string

  // 权限
  modularIds?: string

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
export type DataPager = PagerResponseData<RoleManage>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: Partial<PagerQueryData>): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/role',
      method: 'get',
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: RoleManage): Promise<Result<RoleManage>> {
    return request<Result<RoleManage>>({
      url: '/epi/role',
      method: 'post',
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<RoleManage>> {
    return request<Result<RoleManage>>({
      url: '/epi/role/' + id,
      method: 'get'
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: RoleManage): Promise<Result<RoleManage>> {
    return request<Result<RoleManage>>({
      url: '/epi/role/' + id,
      method: 'put',
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/role/' + id,
      method: 'delete'
    })
  }
}
