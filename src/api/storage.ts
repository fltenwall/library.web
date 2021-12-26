import type { Result } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';
import { ImageManage } from './basis-manage/material-manage/image-manage';

interface ValidUpload {
  name: string;

  hash: string;

  length: number;

  size: number;

  type: string;
}

export default class Service {
  // 上传前检查
  static validUpload(query: ValidUpload): Promise<Result<boolean | ImageManage>> {
    return request<Result<boolean | ImageManage>>({
      url: '/epi/storage/valid',
      method: 'get',
      params: query
    });
  }
}
