import { PagerQueryData } from '/@/lib/http/axios/types';

export interface SearchOptions {
  // 组件
  component: string;
  // 标题
  label?: string;
  // 搜索下标
  key: string;
}

export interface Instance {
  getSearchData: () => PagerQueryData;
}
