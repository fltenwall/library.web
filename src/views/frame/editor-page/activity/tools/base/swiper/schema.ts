import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  list: Array<{ link: string; image: string }>;

  borderRadius: number;

  padding: number;

  duration: number;

  vertical: boolean;
}

export const schema: Schema = {
  height: 150,

  width: 375,

  borderRadius: 0,

  padding: 0,

  duration: 500,

  vertical: false,

  list: [{ link: '', image: '' }]
};

export const label = '轮播图';

export const icon = 'ant-design:small-dash-outlined';
