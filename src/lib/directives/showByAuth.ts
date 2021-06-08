import type { App } from 'vue'
import { useAuthorities } from '/@/hooks/web/useAuthorities'
import { isString, isArray } from '/@/utils/is'

export default function (app: App) {
  app.directive('showByAuth', {
    mounted(el: Element, binding) {
      const { value } = binding
      // 空 或者 不是字符串
      if (!value || (!isString(value) && !isArray(value))) return

      // 结果
      const result = useAuthorities(isArray(value) ? (value as unknown as string[]) : [value])

      if (result) return

      el.remove()
    }
  })
}
