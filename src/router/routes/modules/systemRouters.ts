import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

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
      component: (): unknown =>
        import('/@/views/pages/system-manage/user-manage/data-list/list-page.vue'),
      meta: {
        title: '用户管理',
        auth: ['USER:GET']
      }
    },
    {
      path: 'user-manage-data-page',
      name: 'user-manage-data-page',
      component: (): unknown =>
        import('/@/views/pages/system-manage/user-manage/data-page/data-page.vue'),
      meta: {
        title: '用户详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['USER:CREATE'],
          view: ['USER:GET'],
          edit: ['USER:GET', 'USER:UPDATE']
        }
      }
    },
    {
      path: 'role-manage-list-page',
      name: 'role-manage-list-page',
      component: (): unknown =>
        import('/@/views/pages/system-manage/role-manage/data-list/list-page.vue'),
      meta: {
        title: '角色管理',
        auth: ['ROLE:GET']
      }
    },
    {
      path: 'role-manage-data-page',
      name: 'role-manage-data-page',
      component: (): unknown =>
        import('/@/views/pages/system-manage/role-manage/data-page/data-page.vue'),
      meta: {
        title: '角色详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['ROLE:CREATE', 'MODULAR:GET'],
          view: ['ROLE:GET', 'MODULAR:GET'],
          edit: ['ROLE:GET', 'ROLE:UPDATE', 'MODULAR:GET']
        }
      }
    },
    {
      path: 'module-manage-list-page',
      name: 'module-manage-list-page',
      component: (): unknown => import('/@/views/pages/system-manage/module-manage/index.vue'),
      meta: {
        title: '模块管理',
        auth: ['MODULAR:GET']
      }
    }
  ],
  sortValue: 5
}

export default routers
