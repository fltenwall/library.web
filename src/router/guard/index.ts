import type { Router } from 'vue-router';
import { createPageLoadingGuard } from './pageLoadingGuard';
import { createPageTitleGuard } from './pageTitleGuard';
import { createPermissionGuard } from './permissionGuard';
import { createRouteStateGuard } from './routeStateGuard';
import { createPageSearchGuard } from './pageSearchGuard';
import { createPageAuthGuard } from './pageAuthGuard';

export function createGuard(router: Router): void {
  // 加载
  createPageLoadingGuard(router);

  // 权限拦截
  createPermissionGuard(router);

  // 权限拦截
  createPageAuthGuard(router);

  // 路由拦截 添加 vuex 中
  createRouteStateGuard(router);

  // 搜索页面拦截
  createPageSearchGuard(router);

  // 设置页面标题
  createPageTitleGuard(router);
}
