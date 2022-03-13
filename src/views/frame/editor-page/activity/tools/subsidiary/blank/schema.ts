import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  bgColor: string;

  borderRadius: string;
}

export const schema: Schema = {
  height: 150,

  width: 375,

  bgColor: '#ffffff',

  borderRadius: '0'
};

export const label = '辅助空白';

export const icon = 'mdi:scan-helper';
