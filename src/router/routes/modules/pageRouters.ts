import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

const routers: AppRouteModule = {
  layout: {
    path: 'page-manage',
    name: 'page-manage',
    component: PAGE_LAYOUT_COMPONENT,
    // redirect: { name: 'book-category-list-page' },
    meta: {
      title: '智能页面',
      icon: 'ant-design:file-text-outlined'
    }
  },

  routes: [
    {
      path: 'form-page-list-page',
      name: 'form-page-list-page',
      component: (): unknown =>
        import('/@/views/pages/page-manage/form-page/data-list/list-page.vue'),
      meta: {
        title: '表单页面'
      }
    },
    {
      path: 'form-page-data-page',
      name: 'form-page-data-page',
      component: (): unknown =>
        import('/@/views/pages/page-manage/form-page/data-page/data-page.vue'),
      meta: {
        title: '表单页面详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true
      }
    }
  ],
  sortValue: 4
}

export default routers
