import type { Ref } from 'vue'
import { provide, inject } from 'vue'

interface Instance {
  // 是否只读
  readonly?: Ref<boolean>
}

const key = Symbol('dataPage')

export function provideDataPage(instance: Instance): void {
  provide(key, instance)
}

export function injectDatapage(): Instance {
  return inject(key, {}) as Instance
}
