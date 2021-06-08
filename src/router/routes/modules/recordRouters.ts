import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

const routers: AppRouteModule = {
  layout: {
    path: 'record-manage',
    name: 'record-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'user-manage-list-page' },
    meta: {
      title: '日志管理',
      icon: 'ant-design:clock-circle-outlined'
    }
  },

  routes: [
    {
      path: 'login-record-list-page',
      name: 'login-record-list-page',
      component: (): unknown => import('/@/views/pages/record-manage/login-record/list-page.vue'),
      meta: {
        title: '登录日志',
        auth: ['LOGIN_LOGGER_READ']
      }
    },
    {
      path: 'operate-record-list-page',
      name: 'operate-record-list-page',
      component: (): unknown => import('/@/views/pages/record-manage/operate-record/list-page.vue'),
      meta: {
        title: '操作日志',
        auth: ['OPERATOR_LOGGER_READ']
      }
    }
  ],
  sortValue: 4
}

export default routers
