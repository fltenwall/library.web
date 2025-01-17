import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  link: string;

  text: string;

  textColor: string;

  textSize: number;

  bgColor: string;

  borderRadius: string;

  pointId: string;
}

export const schema: Schema = {
  height: 32,

  width: 100,

  link: '',

  text: '按钮',

  textSize: 12,

  textColor: '#ffffff',

  bgColor: '#1628D4',

  borderRadius: '0',

  pointId: ''
};

export const label = '按钮';

export const icon = 'teenyicons:button-outline';
