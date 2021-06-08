import type { Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'

// 设置守卫
export function createPageSearchGuard(router: Router): void {
  router.beforeEach((to, _from, next) => {
    if (to.name === PageEnum.SEARCH_PAGE && !to.query.q) {
      next({ name: PageEnum.INDEX_PAGE })
    } else {
      next()
    }
  })
}
