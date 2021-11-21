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

  label: 'input',

  placeholder: '',

  maxlength: undefined,

  allowClear: false
};

export const label = '输入框';

export const icon = 'ant-design:edit-outlined';
