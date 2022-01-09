import type { Router } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { userStore } from '/@/store/modules/user';
import { isDef, isUndefined } from '/@/utils/is';

// 设置守卫
export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to, _form, next) => {
    const userInfo = await userStore.getUserInfoAction();

    const { ignoreAuth } = to.meta;

    if (isDef(userInfo.id) && to.name === PageEnum.BASE_LOGIN) {
      // 已登录, 不能去登录页面
      next({ name: PageEnum.BASE_HOME });
    } else if (ignoreAuth) {
      // 忽略身份验证,直接跳转
      next();
    } else if (isUndefined(userInfo.id)) {
      // 身份要验证,但是没有登录,跳转到登录页面
      next({ name: PageEnum.BASE_LOGIN, query: { redirect: to.fullPath as string } });
    } else {
      next();
    }
  });
}
