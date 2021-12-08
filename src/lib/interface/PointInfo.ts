export interface Schema {
  // 唯一值
  id: string;

  // 距离左边位置
  x: number;

  // 距离顶部位置
  y: number;

  // 工具名称
  name: string;

  // 位置锁
  positionLock: false;

  // 尺寸锁
  sizeLock: false;
}

// 组件数据
export interface BaseSchema extends Schema {
  // 宽度
  width: number;

  // 高度
  height: number;
}

export interface PointInfo extends Partial<BaseSchema>, Indexable {
  // 层级
  zIndex?: number;
}
