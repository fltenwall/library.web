import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  title: string;

  titleSize: number;

  titleColor: string;

  titleWeight: number;

  textAlign: string;

  verticalAlign: string;

  bgColor: string;

  borderRadius: string;
}

export const schema: Schema = {
  height: 32,

  width: 200,

  title: '这是一个标题',

  titleWeight: 5,

  titleSize: 18,

  titleColor: '#000000',

  textAlign: 'left',

  verticalAlign: 'top',

  bgColor: '#fff',

  borderRadius: '0'
};

export const label = '标题';

export const icon = 'ant-design:font-size-outlined';
