import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  link: string;
}

export const schema: Schema = {
  height: 200,

  width: 375,

  link: ''
};

export const label = '页面容器';

export const icon = 'carbon:container-software';
