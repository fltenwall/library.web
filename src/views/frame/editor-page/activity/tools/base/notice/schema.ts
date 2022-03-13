import type { PointInfo } from '../../../../../../../lib/interface/Activity';

export interface Schema extends PointInfo {
  noticeContent: string;

  fontColor: string;

  bgColor: string;

  speed: number;

  closeable: number;
}

export const schema: Schema = {
  height: 40,

  width: 375,

  noticeContent: '海量阅读, 阅你所想',

  fontColor: '#e39231',

  bgColor: '#fffbe8',

  speed: 60,

  closeable: 0
};

export const label = '公告';

export const icon = 'ant-design:notification-outlined';
