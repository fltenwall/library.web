import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  src?: string;
}

export const schema: Schema = {
  height: 80,

  width: 300,

  label: ''
};

export const label = '个人素材';

export const visible = false;
