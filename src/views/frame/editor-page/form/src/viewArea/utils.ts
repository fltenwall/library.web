/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, unref, onMounted, onBeforeUnmount, inject } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'
import { isNumber } from '/@/utils/is'
import usePointPos from '../../utils/usePointPos'

interface Store {
  uuid: string

  key: string

  value: any
}

type Place = Pick<PointInfo, 'x' | 'y' | 'width' | 'height' | 'uuid'>

interface Position {
  pos: Required<Omit<Place, 'uuid'>>

  scope: { x: number; y: number }
}

interface LimitRules {
  limitSize: (pos: { x?: number; y?: number }, uuid: string) => Required<Omit<Place, 'uuid'>>

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
export function limitRules(): LimitRules {
  // 视图大小
  const { getViewSize } = inject('viewSize') as {
    getViewSize: () => { width: number; height: number }
  }
  // 拖拽数据信息
  const pointData = computed(() => pointStore.getPointDataState)

  // 处理限制 宽高
  function limitSize(pos: { y?: number; x?: number }, uuid: string) {
    const { height: CH, width: CW } = getViewSize()
    const point = unref(pointData).find((el) => el.uuid === uuid)
    const x = point?.x || 0
    const y = point?.y || 0
    let height = point?.height || 0
    let width = point?.width || 0
    if (isNumber(pos.y)) {
      height = y + height + pos.y > CH ? CH - y : height + pos.y
    }
    if (isNumber(pos.x)) {
      width = x + width + pos.x > CW ? CW - x : width + pos.x
    }
    return { x, y, height, width }
  }

  // 位置信息处理
  function limitPosition(pos: { x: number; y: number }, uuid: string): Position {
    const { height: CH, width: CW } = getViewSize()
    const point = unref(pointData).find((el) => el.uuid === uuid)
    const width = point!.width!
    const height = point!.height!
    const scope = { x: pos.x + (point?.x || 0), y: pos.y + (point?.y || 0), width, height }
    const x = scope.x > CW - width! ? CW - width! : scope.x <= 0 ? 0 : scope.x
    const y = scope.y > CH - height! ? CH - height! : scope.y <= 0 ? 0 : scope.y

    return { pos: { x, y, width, height }, scope }
  }

  return { limitSize, limitPosition }
}

// 视图发送变化
export function viewResize(panelRef: Ref<HTMLElement | null>): void {
  const { setViewSize } = inject('viewSize') as {
    setViewSize: (width: number, height: number) => void
  }

  const resizeObserver = new ResizeObserver(() => {
    const { clientHeight, clientWidth } = panelRef.value!
    // 传递数据
    setViewSize(clientWidth, clientHeight)
  })
  // 开始
  onMounted(() => resizeObserver.observe(panelRef.value!))
  // 结束
  onBeforeUnmount(() => resizeObserver.unobserve(panelRef.value!))
}

// 修改全部组件位置
export function pointDataModify(point: Required<Place>): void {
  const pageOptions = pointStore.getPageOptionsState
  const pointData = pointStore.getPointDataState
  // 弹性布局
  if (pageOptions.layoutType !== 2) return

  for (const el of pointData) {
    const { x, y } = usePointPos(el.uuid === point.uuid ? point : el, el.uuid, point.uuid)

    if (el.uuid !== point.uuid) {
      const uuid = el.uuid
      pointStore.commitUpdatePointData({ uuid, key: 'x', value: x as never })
      pointStore.commitUpdatePointData({ uuid, key: 'y', value: y as never })
      pointStore.commitUpdatePointStyle({
        uuid,
        key: 'transform',
        value: `translate(${el.x}px,${el.y}px)`
      })
    }
  }
}
