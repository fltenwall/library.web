import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import type { RoleManage } from './role-mange'
import request from "/@/lib/http/axios/"

export interface UserManage {
  //  主键
  id?: number

  // 名称
  username?: string

  // 昵称
  nickName?: string

  // 状态
  enabled?: boolean | 0 | 1

  // 电话
  mobile?: string

  // 邮件
  email?: string

  // 性别
  sex?: string

  // 密码
  password?: string

  // 角色
  role?: number[]

  // 角色
  roles?: RoleManage[]

  // 描述
  description?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  //更新时间
  updateTime?: string
}



/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<UserManage>

export default class Service {

  // 向服务查询数据并分页返回结果
  static fecthList(query?: Partial<PagerQueryData>): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/user",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: UserManage): Promise<Result<UserManage>> {
    return request<Result<UserManage>>({
      url: "/api/user",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<UserManage>> {
    return request<Result<UserManage>>({
      url: "/api/user/" + id,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: UserManage): Promise<Result<UserManage>> {
    return request<Result<UserManage>>({
      url: "/api/user/" + id,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/api/user/" + id,
      method: "delete"
    })
  }
}
