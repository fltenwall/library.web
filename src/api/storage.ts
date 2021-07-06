import type { Result } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'
import { ContentTypeEnum } from '/@/enums/httpEnum'

export default class Service {
  // 上传前检查
  static validUpload(query: {
    name: string
    hash: string
    length: number
  }): Promise<Result<boolean>> {
    return request<Result<boolean>>({
      url: '/epi/storage/valid',
      method: 'get',
      params: query
    })
  }

  static saveImageNewItem(
    item: FormData,
    id: string,
    progress: OnUploadProgress
  ): Promise<Result<boolean>> {
    return request<Result<boolean>>({
      url: '/epi/storage/' + id,
      method: 'post',
      data: item,
      headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
      onUploadProgress: progress
    })
  }
}
