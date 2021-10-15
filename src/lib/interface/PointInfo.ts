// 组件数据
export interface BaseSchema {
  // 唯一值
  uuid: string;
  // 距离左边位置
  x: number;

  // 距离顶部位置
  y: number;

  // 宽度
  width: number;

  // 高度
  height: number;
}

export interface PointInfo extends Partial<BaseSchema>, Indexable {
  // 工具名称
  name?: string;

  // 层级
  zIndex?: number;
}
