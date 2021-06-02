/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, unref, provide, ref, watch } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'

export function queryPoint(uuid: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointDataState)

  return unref(pointData).find((el) => el.uuid === uuid)
}

export function templateInit<T>(dataItem: T): void {
  provide('editor-form', { changeTrigger })

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
    { immediate: true }
  )

  // 数据改变触发
  function changeTrigger(key: string) {
    const value = (dataItem as any)[key] as never
    isValueUpdateFromInner.value = true
    pointStore.commitUpdatePointData({ uuid: unref(pointUUID), key, value })
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
