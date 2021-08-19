/**
 * @description 添加新的页面枚举 变量 需要同时添加 PageMode 和 pageModeName 和 list
 */

// 页面的模式枚举
export enum PageMode {
  error = -1,
  view,
  edit,
  new
}

export type Mode = 'view' | 'edit' | 'new';

// 模块对应的中文名称
export const pageModeName = ['查看', '编辑', '新增'];

export interface ParsePageModeFromString {
  mode: number;
  modeName: string;
}

/**
 * 从字串取得页面模式
 * @param mode 模式字串
 */
export function parsePageModeFromString(mode: string): ParsePageModeFromString {
  const list: Array<PageMode> = [PageMode.view, PageMode.edit, PageMode.new];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (PageMode[item] === mode) {
      return { modeName: pageModeName[i], mode: i };
    }
  }

  return { modeName: '错误', mode: PageMode.error };
}
