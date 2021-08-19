import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { createGuard } from '/@/router/guard/';
import { basicRoutes } from './routes/';
import config from '/@/config/index';

const router = createRouter({
  history: createWebHistory(config.publicPath),
  routes: basicRoutes as RouteRecordRaw[]
});

export function setupRouter(app: App<Element>): void {
  app.use(router);
  createGuard(router);
}

export default router;
