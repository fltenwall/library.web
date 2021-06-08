/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'
import { ref } from 'vue'
import { assign, cloneDeep } from 'lodash-es'
import { isNull } from '/@/utils/is'
import { difference } from '/@/utils/difference'

interface Record {
  editable?: boolean
}

interface UseTableEdit<T> {
  // 编辑行
  editingIndex: Ref<number | null>

  // 处理数据改变
  handleEditChange: (value: string, record: T, column: string) => void

  // 处理点击编辑按键
  handleClickEdit: (record: T, index: number) => void

  // 处理点击取消按键
  handleCancelEdit: (record: T) => void

  // 处理点击保存按键
  handleSvaeEdit: (record: T) => void
}
// 参数
interface Options {
  onSaveData: (record: any, data: any) => Promise<void>
}

export interface EditCol {
  editCol?: string | number
}

export function useTableEdit<T extends Record>({ onSaveData }: Options): UseTableEdit<T> {
  const editingIndex = ref<number | null>(null)

  // 编辑数据
  let cacheRecord = {}

  function handleEditChange(value: string, record: T, column: string): void {
    (record as any)[column] = value
  }

  function handleClickEdit(record: T, index: number): void {
    if (!isNull(editingIndex.value)) return
    editingIndex.value = index
    cacheRecord = cloneDeep(record)
    record.editable = true
  }

  function handleCancelEdit(record: T): void {
    assign(record, cacheRecord)
    cacheRecord = {}
    editingIndex.value = null
    Reflect.deleteProperty(record, 'editable')
  }

  function handleSvaeEdit(record: T) {
    Reflect.deleteProperty(record, 'editable')
    const contrast = difference(record, cacheRecord)
    if (contrast) onSaveData(record, contrast as T)
    cacheRecord = {}
    editingIndex.value = null
  }

  return {
    editingIndex,
    handleSvaeEdit,
    handleEditChange,
    handleClickEdit,
    handleCancelEdit
  }
}
