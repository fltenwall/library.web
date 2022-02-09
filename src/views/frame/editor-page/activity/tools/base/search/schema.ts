import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  placeholder: string;

  placeholderSize: number;

  placeholderColor: string;

  placeholderBgColor: string;

  borderRadius: number;

  bgColor: string;

  position: string;

  paddingX: number;

  paddingY: number;

  contentPaddingX: number;

  contentPaddingY: number;

  contentBorderRadius: string;
}

export const schema: Schema = {
  height: 40,

  width: 375,

  placeholder: '搜索一下',

  placeholderSize: 12,

  placeholderColor: '#969799',

  placeholderBgColor: '#ffffff',

  borderRadius: 0,

  bgColor: '#ffffff',

  position: 'left',

  paddingY: 8,

  paddingX: 12,

  contentPaddingX: 8,

  contentPaddingY: 12,

  contentBorderRadius: '0'
};

export const label = '搜索';

export const icon = 'ant-design:search-outlined';
