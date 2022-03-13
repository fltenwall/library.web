import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  src?: string;
}

export const schema: Schema = {
  height: 100,

  width: 100,

  label: ''
};

export const label = '个人素材';

export const visible = false;
