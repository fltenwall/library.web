// 组件数据
export interface PointInfo {
  // 唯一值
  uuid?: string

  // 距离左边位置
  x?: number

  // 距离顶部位置
  y?: number

  // 工具名称
  name?: string

  // 宽度
  width?: number

  // 高度
  height?: number

  // 层级
  zIndex?: number

  [key: string]: unknown
}
