import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  label: string;
}

export const schema: Schema = {
  height: 80,

  width: 300,

  label: ''
};

export const label = '柱状图';

export const icon = 'ant-design:bar-chart-outlined';
