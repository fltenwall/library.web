import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  borderColor: string;

  type: string;

  borderWidth: number;

  borderStyle: string;
}

export const schema: Schema = {
  height: 20,

  width: 375,

  borderColor: '#000000',

  borderWidth: 2,

  type: 'horizontal',

  borderStyle: 'solid'
};

export const label = '辅助线';

export const icon = 'radix-icons:divider-horizontal';
