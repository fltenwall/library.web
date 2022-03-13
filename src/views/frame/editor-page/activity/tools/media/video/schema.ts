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

  label: 'video',

  placeholder: '',

  maxlength: undefined,

  allowClear: false
};

export const label = '视频组件';

export const icon = 'dashicons:editor-video';
