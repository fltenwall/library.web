import type { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { provide, inject } from 'vue'

export interface Instance {
  getColumns: () => ColumnProps[]
  setColumns: (column: string[]) => void
}

const key = Symbol('table')

export function provideTable(instance: Instance): void {
  provide(key, instance)
}

export function injectTable(): Instance {
  return inject(key, {}) as Instance
}
