import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  startTime: string;

  endTime: string;

  waitTitle: string;

  startedTitle: string;

  endedTitle: string;

  borderRadius: number;

  fontColor: string;

  bgColor: string;

  timeFontColor: string;

  timeBgColor: string;

  styleTheme: number;

  position: string;
}

export const schema: Schema = {
  height: 40,

  width: 375,

  startTime: '',

  endTime: '',

  waitTitle: '距开始：',

  startedTitle: '距结束：',

  endedTitle: '已结束',

  borderRadius: 10,

  fontColor: '#000000',

  bgColor: 'transparent',

  timeFontColor: '#000000',

  timeBgColor: 'transparent',

  styleTheme: 1,

  position: 'left'
};

export const label = '倒计时';

export const icon = 'ant-design:field-time-outlined';
