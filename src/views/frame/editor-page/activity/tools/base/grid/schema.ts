import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  list: Array<{ link: string; image: string; label: string; target: string }>;

  type: 'image' | 'text' | 'image-text';

  fontColor: string;

  fontSize: number;

  bgColor: string;

  cardBgColor: string;

  cardBorderRadius: number;

  iconWidth: number;

  paddingTop: number;

  paddingBottom: number;

  paddingY: number;

  showNum: number;

  radiusTop: number;

  radiusBottom: number;

  interval: number;

  fixed: number;
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

  cardBorderRadius: 0,

  paddingY: 0,

  paddingTop: 0,

  paddingBottom: 0,

  showNum: 4,

  radiusTop: 0,

  radiusBottom: 0,

  interval: 10,

  fixed: 0,

  list: [{ link: '', image: '', label: '', target: '_self' }]
};

export const label = { template: '图文导航', material: '素材', setting: '高级' };

export const icon = 'bi:grid-3x2';