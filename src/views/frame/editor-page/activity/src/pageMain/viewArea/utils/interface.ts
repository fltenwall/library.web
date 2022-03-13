import type { BaseSchema } from '/@/lib/interface/Activity';

export interface DataItem {
  // 选择鼠标指针浮动在其上的元素
  hover?: string;
  // 是否移动
  isMove?: boolean;
  // 状态
  state?: 'start' | 'end' | 'move';
  // 移动中 元素
  id?: string;
  // 位置
  pos: {
    // 布局位置
    layout?: BaseSchema;
    // 移动位置
    move?: BaseSchema;
  };
}

export interface Move {
  // 唯一值
  record: BaseSchema;
  // 类型
  type: 'mouse' | 'ew' | 'ns' | 'se';
  // 相对位移
  x: number;
  y: number;
}
