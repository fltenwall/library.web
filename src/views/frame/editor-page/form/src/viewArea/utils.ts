/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, unref } from 'vue'
import { pointStore } from '/@/store/modules/point'
import { isNumber } from '/@/utils/is'

interface Store {
  uuid: string

  key: string

  value: any
}

interface Limit {
  x?: number

  y?: number

  width?: number

  height?: number
}

interface Position {
  pos: Limit

  scope: { x: number; y: number }
}

interface LimitRules {
  limitSize: (pos: { x?: number; y?: number }, uuid: string) => Limit

  limitPosition: (pos: { x: number; y: number }, uuid: string) => Position
}

// 处理 vuex 使用重载
export function handleStore(type: 'd', { uuid }: { uuid: string }): void

export function handleStore(type: 'u', { uuid, key, value }: Store): void

export function handleStore(type: string, { uuid, key, value }: Store): void {
  const mapState = {
    u: () => {
      // 更新
      pointStore.commitUpdatePointData({ uuid, key, value: value as never })
    },
    d: () => {
      // 删除
      pointStore.commitDeletePointData({ uuid })
    }
  }

  mapState[type as 'u' | 'd']()
}

// 拖拽限制规则
export function limitRules(panelRef: Ref<HTMLElement | null>): LimitRules {
  // 拖拽数据信息
  const pointData = computed(() => pointStore.getPointDataState)

  // 处理限制 宽高
  function limitSize(pos: { y?: number; x?: number }, uuid: string) {
    const { clientHeight: cH, clientWidth: cW } = panelRef.value!
    const point = unref(pointData).find((el) => el.uuid === uuid)
    const x = point?.x || 0
    const y = point?.y || 0
    let height = point?.height || 0
    let width = point?.width || 0
    if (isNumber(pos.y)) {
      height = y + height + pos.y > cH ? cH - y : height + pos.y
    }
    if (isNumber(pos.x)) {
      width = x + width + pos.x > cW ? cW - x : width + pos.x
    }
    return { x, y, height, width }
  }

  // 位置信息处理
  function limitPosition(pos: { x: number; y: number }, uuid: string): Position {
    const { clientHeight, clientWidth } = panelRef.value!
    const point = unref(pointData).find((el) => el.uuid === uuid)
    const width = point!.width!
    const height = point!.height!
    const scope = { x: pos.x + (point?.x || 0), y: pos.y + (point?.y || 0), width, height }
    const x = scope.x > clientWidth - width! ? clientWidth - width! : scope.x <= 0 ? 0 : scope.x
    const y = scope.y > clientHeight - height! ? clientHeight - height! : scope.y <= 0 ? 0 : scope.y

    return { pos: { x, y, width, height }, scope }
  }

  return { limitSize, limitPosition }
}
