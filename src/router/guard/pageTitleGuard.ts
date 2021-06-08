import type { Router } from 'vue-router'
import { useTitle } from '/@/hooks/core/useTitle'

/**
 * 设置页面标题
 * @param {*} title  :页面标题
 */
const setDocumentTitle = (title: string) => {
  document.title = title
}

export function createPageTitleGuard(router: Router): void {
  router.beforeEach((to) => {
    setTimeout(() => {
      setDocumentTitle(useTitle(to.meta.title as string))
    }, 30)
  })
}
