import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'



const routers: AppRouteModule = {
  layout: {
    path: 'basis-manage',
    name: 'basis-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'date-manage-list-page' },
    meta: {
      title: '基础数据',
      icon: 'ant-design:appstore-outlined'
    }
  },

  routes: [ 
    {
      path: "date-manage-list-page",
      name: 'date-manage-list-page',
      component: (): unknown => import(`/@/views/pages/system-manage/user-manage/data-list/list-page.vue`),
      meta: {
        title: '日期管理'
      }
    },
    {
      path: "data-dictionary-list-page",
      name: 'data-dictionary-list-page',
      component: (): unknown => import(`/@/views/pages/system-manage/user-manage/data-list/list-page.vue`),
      meta: {
        title: '数据字典'
      }
    }
  ]
}



export default routers