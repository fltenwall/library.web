import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  label: string;

  placeholder: string;

  maxlength: number | undefined;

  allowClear: boolean;
}

export const schema: Schema = {
  height: 32,

  width: 200,

  label: 'scatter',

  placeholder: '',

  maxlength: undefined,

  allowClear: false
};

export const label = '散点图';

export const icon = 'carbon:chart-scatter';
