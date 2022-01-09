import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  title: string;

  titleSize: number;

  titleColor: string;

  textAlign: string;

  verticalAlign: string;

  bgColor: string;

  upperRadius: number;

  lowerPadding: number;
}

export const schema: Schema = {
  height: 32,

  width: 200,

  title: '这是一个标题',

  titleSize: 18,

  titleColor: '#000000',

  textAlign: 'left',

  verticalAlign: 'top',

  bgColor: '#fff',

  upperRadius: 0,

  lowerPadding: 0
};

export const label = '标题';

export const icon = 'ant-design:font-size-outlined';
