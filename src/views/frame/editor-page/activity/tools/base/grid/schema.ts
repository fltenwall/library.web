import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  list: Array<{ link: string; image: string; label: string; target: string }>;

  type: 'image' | 'text' | 'image-text';

  fontColor: string;

  fontSize: number;

  bgColor: string;

  cardBgColor: string;

  cardBorderRadius: string;

  iconWidth: number;

  paddingTop: number;

  paddingBottom: number;

  paddingY: number;

  showCol: number;

  showRow: number;

  borderRadius: string;

  interval: number;

  fixed: number;

  scrollbarColor: string;

  scrollbarThumbColor: string;
}

export const schema: Schema = {
  height: 100,

  width: 375,

  type: 'image-text',

  fontColor: '#000000',

  fontSize: 12,

  iconWidth: 30,

  bgColor: 'transparent',

  cardBgColor: 'transparent',

  cardBorderRadius: '0',

  paddingY: 0,

  paddingTop: 0,

  paddingBottom: 0,

  showCol: 4,

  showRow: 4,

  borderRadius: '',

  interval: 10,

  fixed: 0,

  list: [{ link: '', image: '', label: '', target: '_self' }],

  scrollbarColor: '#d4d8de',

  scrollbarThumbColor: 'ff6d2a'
};

export const label = { template: '图文导航', material: '素材', setting: '高级' };

export const icon = 'bi:grid-3x2';
