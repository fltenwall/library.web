import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  startTime: string;

  endTime: string;
}

export const schema: Schema = {
  height: 32,

  width: 200,

  startTime: '',

  endTime: ''
};

export const label = '倒计时';

export const icon = 'ant-design:field-time-outlined';
