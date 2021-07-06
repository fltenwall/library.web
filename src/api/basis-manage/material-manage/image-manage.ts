import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'
import { ContentTypeEnum } from '/@/enums/httpEnum'

export interface ImageManage {
  //  主键
  id?: string

  // 名称
  name?: string

  // 哈希
  hash?: string

  // 状态
  status?: boolean

  // 分组 id
  classifyId?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  // 更新时间
  updateTime?: string
}

export interface Classify {
  id?: string

  name?: string
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

  // 向服务查询数据并分页返回结果
  static fecthImageList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/material/image',
      method: 'get',
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveClassifyNewItem(item: { title: string }): Promise<Result<ImageManage>> {
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

  // 上传照片
  static saveImageNewItem(item: FormData): Promise<Result<boolean>> {
    return request<Result<boolean>>({
      url: '/epi/material/image',
      method: 'post',
      data: item,
      headers: { 'Content-Type': ContentTypeEnum.FORM_DATA }
    })
  }

  // 合并分片
  static mergeChunks(item: { classifyId: string; hash: string }): Promise<Result<boolean>> {
    return request<Result<boolean>>({
      url: '/epi/material/image/merge-chunk',
      data: item,
      method: 'post'
    })
  }
}
