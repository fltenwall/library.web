/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, unref, provide, ref, watch, inject } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'

type Trigger = 'width' | 'height' | 'x' | 'y'

export function queryPoint(uuid: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointDataState)

  return unref(pointData).find((el) => el.uuid === uuid)
}

export function templateInit<T extends PointInfo>(dataItem: T): void {
  provide('editor-form', { changeTrigger })

  const { getViewSize } = inject('viewSize') as {
    getViewSize: () => { width: number; height: number }
  }

  const pointInfo = computed(() => pointStore.getPointInfo)

  const pointUUID = computed(() => pointStore.getPointUUIDState)
  // 内部更新不触发
  const isValueUpdateFromInner = ref<boolean>(false)

  // 数据变化触发
  watch(
    () => pointInfo.value,
    (val) => {
      if (isValueUpdateFromInner.value) {
        // changeTrigger 函数触发不更新
        isValueUpdateFromInner.value = false
      } else {
        initData(val)
      }
    },
    { immediate: true, deep: true }
  )

  // 数据改变触发
  function changeTrigger(key: Trigger | string) {
    const { width: CW, height: CH } = getViewSize()
    const value = (dataItem as any)[key] as never
    isValueUpdateFromInner.value = true

    // 修改数据
    const mapState = {
      width: () => {
        const width =
          unref(pointInfo).x! + value > CW ? CW - unref(pointInfo).x! : value < 10 ? 10 : value
        updateBaseContent('width', 'width', width, `${width}px`)
      },
      height: () => {
        const height =
          unref(pointInfo).y! + value > CH ? CH - unref(pointInfo).y! : value < 10 ? 10 : value
        updateBaseContent('height', 'height', height, `${height}px`)
      },
      x: () => {
        const x = value + unref(pointInfo).width! > CW ? CW - unref(pointInfo).width! : value
        updateBaseContent('x', 'transform', x, `translate(${x}px,${unref(pointInfo).y}px`)
      },
      y: () => {
        const y = value + unref(pointInfo).height! > CH ? CH - unref(pointInfo).height! : value
        updateBaseContent('y', 'transform', y, `translate(${unref(pointInfo).x}px,${y}px`)
      },
      other: () => {
        pointStore.commitUpdatePointData({ uuid: unref(pointUUID), key, value })
      }
    }

    mapState[key as Trigger] ? mapState[key as Trigger]() : mapState['other']()
  }

  // 更新基本内容
  function updateBaseContent(
    key: Trigger,
    styleKey: string,
    dataValue: number,
    styleValue: string
  ) {
    dataItem[key] = dataValue
    pointStore.commitUpdatePointData({ uuid: unref(pointUUID), key, value: dataValue as never })
    pointStore.commitUpdatePointStyle({ uuid: unref(pointUUID), key: styleKey, value: styleValue })
  }

  // 数据信息 初始化
  function initData(data: PointInfo) {
    Reflect.ownKeys(dataItem as any).forEach((key) => {
      Reflect.deleteProperty(dataItem as any, key)
    })

    Reflect.ownKeys(data!).forEach((key) => {
      (dataItem as any)[key] = data![key as string]
    })
  }
}
