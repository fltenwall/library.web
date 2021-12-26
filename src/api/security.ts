import type { Result } from '/@/lib/http/axios/types';
import request from '/@/lib/http/axios/';
import { ContentTypeEnum } from '/@/enums/httpEnum';

export interface UserInfo {
  // 主键
  id?: number;

  // 账户名称
  username?: string;

  // 昵称
  nickname?: string;

  // 角色权限
  authorities?: string[];

  // 电话
  mobile?: string;

  // 邮件
  email?: string;

  // 性别
  sex?: string;

  // 省份
  province?: string;

  // 城市
  city?: string;

  // 头像
  portrait?: string;

  // 是否超级管理员
  superAdmin?: boolean;

  // 描述
  description?: string;

  // 是否禁用
  enabled?: boolean;
}

export interface Register {
  // 账户
  username?: string;

  // 密码
  password?: string;

  // 电话
  mobile?: string;

  // 邮箱
  email?: string;

  // 重复
  repeat?: string;
}

export interface CSRF {
  // 用户标识符
  token: string;

  // 请求头名称
  headerName: string;
}

export interface Security {
  user: Required<UserInfo>;
  _csrf: CSRF;
}

export interface LoginParams {
  password: string;

  account: string;
}

export default class Service {
  // 获取用户信息和token
  static getAccountInfo(query?: { code: string }): Promise<Result<Security>> {
    return request<Result<Security>>({
      url: '/epi/user/me',
      method: 'get',
      params: query
    });
  }

  // 更新用户信息和token
  static updateAccountInfo(data: UserInfo): Promise<Result<Required<UserInfo>>> {
    return request<Result<Required<UserInfo>>>({
      url: '/epi/user/me',
      method: 'put',
      data
    });
  }

  // 登录
  static loginApi(data: LoginParams): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/user/login',
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED
      }
    });
  }

  // 退出
  static logoutApi(): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/user/logout',
      method: 'post'
    });
  }

  // 注册
  static registerApi(data: Register): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/epi/user/register',
      method: 'post',
      data: data
    });
  }
}
