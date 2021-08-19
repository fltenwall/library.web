/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 服务器回复数据
 */
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * 分页请求
 * sort=firstname&srot=lastname,desc表示按firstname正序排序排列基础上按lastname倒序排列
 */
export interface PagerQueryData {
  page: number;
  size: number;
  sort: string;
  [prop: string]: any;
}

/**
 * 分页服务回复
 */
export interface ResponseData<T = any> {
  // 数据
  content: Array<T>;
  // 总个数
  totalElements: number;
  // 总页数
  totalPages: number;
}

/**
 * 服务器回复错误
 */
export interface ResponseError {
  code: number;
  msg: string;
  headers?: any;
}

/**
 * 分页数据结果
 */
export type PagerResponseData<T> = Result<ResponseData<T>>;
