import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  list: Array<{ link: string; image: string; label: string; target: string }>;

  borderRadius: string;

  padding: number;

  duration: number;

  vertical: boolean;

  autoplay: number;

  bgColor: string;

  indicatorSelectColor: string;

  indicatorUnselectColor: string;

  indicatorType: string;
}

export const schema: Schema = {
  height: 150,

  width: 375,

  borderRadius: '0',

  padding: 0,

  autoplay: 5000,

  duration: 500,

  vertical: false,

  bgColor: '#ffffff',

  indicatorSelectColor: '#ffffff',

  indicatorUnselectColor: '#ffffff',

  indicatorType: 'dot',

  list: [{ link: '', image: '', label: '', target: '_self' }]
};

export const label = '轮播图';

export const icon = 'ant-design:small-dash-outlined';
