import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  noticeContent: string;

  fontColor: string;

  bgColor: string;
}

export const schema: Schema = {
  height: 40,

  width: 375,

  noticeContent: '海量阅读, 阅你所想',

  fontColor: '#e39231',

  bgColor: '#fffbe8'
};

export const label = '公告';

export const icon = 'ant-design:notification-outlined';
