import { pointStore } from '/@/store/modules/point'

interface Schema {
  x: number

  y: number

  width: number

  height: number
}

// 计算位置
export default function (schema: Schema, ...uuids: string[]): { x: number; y: number } {
  const pageOptions = pointStore.getPageOptionsState
  const pointData = pointStore.getPointDataState
  // 弹性布局
  if (pageOptions.layoutType !== 2) return { x: schema.x, y: schema.y }
  // 差值
  let reduceY = schema.y

  for (const el of pointData) {
    if (el.y > schema.y || uuids.includes(el.uuid)) continue
    const lo = Math.max(schema.x, el.x)
    const hi = Math.min(schema.x + schema.width, el.x + el.width)
    // 求区间交际
    if (lo > hi) continue
    // 计算差值
    if (reduceY > schema.y - el.y - el.height) {
      reduceY = schema.y - el.y - el.height
    }
  }

  return { x: schema.x, y: schema.y - reduceY }
}
