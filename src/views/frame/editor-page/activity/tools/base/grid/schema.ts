import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  link: string;
}

export const schema: Schema = {
  height: 100,

  width: 375,

  link: ''
};

export const label = '图文导航';

export const icon = 'bi:grid-3x2';
