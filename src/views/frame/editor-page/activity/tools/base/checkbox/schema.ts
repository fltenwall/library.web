import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  label: string;
}

export const schema: Schema = {
  height: 80,

  width: 300,

  label: ''
};

export const label = '多选框';

export const icon = 'ion:checkbox-outline';
