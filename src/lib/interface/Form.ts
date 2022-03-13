export interface Schema {
  // 唯一值
  id: string;

  // 工具名称
  name: string;

  // 组件名称
  label: string;
}

export interface PointInfo extends Schema, Indexable {}
