import type { PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';

export interface AccessRecord {
  //  主键
  id?: number;

  // 用户名
  account?: string;

  // ip
  ip?: string;

  // 标识符
  identify?: string;

  ipRecord?: {
    // 国家
    nation?: string;
    // 省
    province?: string;
    // 市
    city?: string;
    // 区
    district?: string;
  };

  // 客户端
  browser?: string;

  // 操作系统
  os?: string;

  // 创建时间
  createTime?: string;

  // 更新时间
  updateTime?: string;
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<AccessRecord>;

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/record/access',
      method: 'get',
      params: query
    });
  }
}
