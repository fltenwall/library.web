import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';

export interface ApiManage {
  //  主键
  id?: number;

  // 名称
  name?: string;

  // 方法
  method?: string;

  // 是否全部数据
  isAllData?: boolean | 1 | 0;

  // 标识
  identifier?: string;

  // 路径
  path?: string;

  // 状态
  state?: boolean | 1 | 0;

  // 描述
  description?: string;

  // 创建者
  createBy?: string;

  // 更新者
  updateBy?: string;

  // 创建时间
  createTime?: string;

  // 更新时间
  updateTime?: string;
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<ApiManage>;

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: Partial<PagerQueryData>): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/api-manage',
      method: 'get',
      params: query
    });
  }

  // 向服务查询全部数据
  static fecthListByAll(query?: ApiManage): Promise<Result<ApiManage[]>> {
    return request<Result<ApiManage[]>>({
      url: '/epi/all/api',
      method: 'get',
      params: query
    });
  }

  // 保存数据到远程服务器
  static saveNewItem(item: ApiManage): Promise<Result<ApiManage>> {
    return request<Result<ApiManage>>({
      url: '/epi/api-manage',
      method: 'post',
      data: item
    });
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<ApiManage>> {
    return request<Result<ApiManage>>({
      url: '/epi/api-manage/' + id,
      method: 'get'
    });
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: ApiManage): Promise<Result<ApiManage>> {
    return request<Result<ApiManage>>({
      url: '/epi/api-manage/' + id,
      method: 'put',
      data: item
    });
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/api-manage/' + id,
      method: 'delete'
    });
  }
}
