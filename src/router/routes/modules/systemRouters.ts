import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const routers: AppRouteModule = {
  layout: {
    path: 'system-manage',
    name: 'system-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'user-manage-list-page' },
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-outlined'
    }
  },

  routes: [
    {
      path: 'user-manage-list-page',
      name: 'user-manage-list-page',
      component: (): unknown => import('/@/views/pages/system-manage/user-manage/data-list/index.vue'),
      meta: {
        title: '用户管理',
        auth: ['USERMANAGE:GET']
      }
    },
    {
      path: 'user-manage-data-page',
      name: 'user-manage-data-page',
      component: (): unknown => import('/@/views/pages/system-manage/user-manage/data-page/data-page.vue'),
      meta: {
        title: '用户详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['USERMANAGE:POST'],
          view: ['USERMANAGE:ID:GET'],
          edit: ['USERMANAGE:ID:GET', 'USERMANAGE:PUT']
        }
      }
    },
    {
      path: 'role-manage-list-page',
      name: 'role-manage-list-page',
      component: (): unknown => import('/@/views/pages/system-manage/role-manage/data-list/index.vue'),
      meta: {
        title: '角色管理',
        auth: ['ROLEMANAGE:GET']
      }
    },
    {
      path: 'role-manage-data-page',
      name: 'role-manage-data-page',
      component: (): unknown => import('/@/views/pages/system-manage/role-manage/data-page/data-page.vue'),
      meta: {
        title: '角色详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['ROLEMANAGE:POST', 'MODULARMANAGE:GET'],
          view: ['ROLEMANAGE:GET', 'MODULARMANAGE:GET'],
          edit: ['ROLEMANAGE:GET', 'ROLEMANAGE:PUT', 'MODULARMANAGE:GET']
        }
      }
    },
    {
      path: 'module-manage-list-page',
      name: 'module-manage-list-page',
      component: (): unknown => import('/@/views/pages/system-manage/module-manage/index.vue'),
      meta: {
        title: '模块管理',
        auth: ['MODULARMANAGE:GET']
      }
    },
    {
      path: 'api-manage-list-page',
      name: 'api-manage-list-page',
      component: (): unknown => import('/@/views/pages/system-manage/api-manage/data-list/index.vue'),
      meta: {
        title: '接口管理',
        auth: ['APIMANAGE:GET']
      }
    },
    {
      path: 'api-manage-data-page',
      name: 'api-manage-data-page',
      component: (): unknown => import('/@/views/pages/system-manage/api-manage/data-page/data-page.vue'),
      meta: {
        title: '接口管理详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['APIMANAGE:POST'],
          view: ['APIMANAGE:ID:GET'],
          edit: ['APIMANAGE:ID:GET', 'APIMANAGE:PUT']
        }
      }
    }
  ],
  sortValue: 5
};

export default routers;
