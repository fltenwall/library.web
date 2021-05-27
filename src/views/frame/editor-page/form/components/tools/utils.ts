/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, unref, provide, Ref, watch } from 'vue'
import { PointInfo } from '/@/lib/interface/PointInfo'
import { pointStore } from '/@/store/modules/point'

export function queryPoint(uuid: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointState)

  return unref(pointData).find((el) => el.uuid === uuid)
}

export function templateInit<T>(uuid: Ref<string>, dataItem: T): void {
  provide('editor-form', { changeTrigger })

  watch(
    () => uuid.value,
    () => initData(),
    { immediate: true }
  )

  // 数据改变触发
  function changeTrigger(key: string) {
    pointStore.commitUpdatePointState({
      uuid: uuid.value,
      key,
      value: (dataItem as any)[key] as never
    })
  }

  // 数据信息 初始化
  function initData() {
    const point = queryPoint(uuid.value)

    Reflect.ownKeys(dataItem as any).forEach((key) => {
      Reflect.deleteProperty(dataItem as any, key)
    })

    Reflect.ownKeys(point!).forEach((key) => {
      (dataItem as any)[key] = point![key as string]
    })
  }
}
