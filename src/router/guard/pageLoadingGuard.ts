import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 设置加载
export function createPageLoadingGuard(router: Router): void {
  router.beforeEach((): void => {
    NProgress.start()
  })

  router.afterEach((): void => {
    NProgress.done()
  })
}
