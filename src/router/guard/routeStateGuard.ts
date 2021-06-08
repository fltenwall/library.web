import type { Router } from 'vue-router'

import { tabStore } from '/@/store/modules/tab'

// 设置守卫
export function createRouteStateGuard(router: Router): void {
  router.beforeEach(async (to) => {
    const { path, query, params, name, meta } = to
    tabStore.commitLastChangeRouteState({ path, query, params, name, meta })
  })
}
