import type { Mode } from '/@/utils/helper/breadcrumb';
import type { Router } from 'vue-router';
import { Auth } from '../types';
import { PageEnum } from '/@/enums/pageEnum';
import { useAuthorities } from '/@/hooks/web/useAuthorities';

// 设置角色守卫
export function createPageAuthGuard(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    // 获取页面权限
    const { auth } = to.meta as { auth?: string[] | Auth };

    const { mode } = to.query as { mode?: Mode };

    // 结果
    const result = useAuthorities(auth, mode);

    if (result) {
      next();
    } else {
      next({ name: PageEnum.FORBIDDEN_PAGE });
    }
  });
}
