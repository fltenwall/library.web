import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface InputSchema extends PointInfo {
  label: string;

  placeholder: string;

  maxlength: number | undefined;

  allowClear: boolean;
}

export const schema: InputSchema = {
  height: 32,

  width: 200,

  label: 'input',

  placeholder: '',

  maxlength: undefined,

  allowClear: false
};

export const name = '输入框';

export const icon = 'ant-design:edit-outlined';
