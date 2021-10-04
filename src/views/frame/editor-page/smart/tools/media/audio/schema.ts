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

export const name = '音频组件';

export const icon = 'cil:audio-spectrum';
