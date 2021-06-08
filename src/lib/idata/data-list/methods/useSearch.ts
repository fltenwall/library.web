import { Ref } from 'vue'
import { PagerQueryData } from '/@/lib/http/axios/types'

interface UseSearchBase {
  // 重置数据
  onResetData: () => void
}

interface UseSearch extends UseSearchBase {
  // 展开 收起
  onOpen: () => void
}

export interface SearchInstance {
  // 获取当前查询数据
  getCurQueryData: () => PagerQueryData

  [prop: string]: unknown
}

export function useSearch(queryData: PagerQueryData): UseSearchBase
export function useSearch(queryData: PagerQueryData, isOpen: Ref<boolean>): UseSearch
export function useSearch(queryData: PagerQueryData, isOpen?: Ref<boolean>): any {
  function onResetData() {
    const ignoreData = ['page', 'pageSize', 'sort']
    for (const key in queryData) {
      !ignoreData.some((value) => value === key) && Reflect.deleteProperty(queryData, key)
    }
  }

  function onOpen() {
    isOpen!.value = !isOpen!.value
  }

  return {
    onOpen,
    onResetData
  }
}
