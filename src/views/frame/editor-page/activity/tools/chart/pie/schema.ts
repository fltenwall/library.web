import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  label: string;

  placeholder: string;

  maxlength: number | undefined;

  allowClear: boolean;
}

export const schema: Schema = {
  height: 32,

  width: 200,

  label: 'pie',

  placeholder: '',

  maxlength: undefined,

  allowClear: false
};

export const label = '饼图';

export const icon = 'eva:pie-chart-outline';
