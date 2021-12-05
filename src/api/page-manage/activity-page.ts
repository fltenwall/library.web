import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';

export interface ActivityManage {
  //  主键
  id?: number;

  // 名称
  name?: string;

  // 外边距
  margin?: string;

  // 状态
  state?: boolean | 1 | 0;

  // 布局类型
  layoutType?: 1 | 2;

  // 移动端
  mode?: 1 | 2;

  // 背景颜色
  backgroundColor?: string;

  // 背景颜色
  backgroundImage?: string;

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
export type DataPager = PagerResponseData<ActivityManage>;

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/epi/activity',
      method: 'get',
      params: query
    });
  }

  // 保存数据到远程服务器
  static saveNewItem(item: ActivityManage): Promise<Result<ActivityManage>> {
    return request<Result<ActivityManage>>({
      url: '/epi/activity',
      method: 'post',
      data: item
    });
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<ActivityManage>> {
    return request<Result<ActivityManage>>({
      url: '/epi/activity/' + id,
      method: 'get'
    });
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: ActivityManage): Promise<Result<ActivityManage>> {
    return request<Result<ActivityManage>>({
      url: '/epi/activity/' + id,
      method: 'put',
      data: item
    });
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/activity/' + id,
      method: 'delete'
    });
  }
}