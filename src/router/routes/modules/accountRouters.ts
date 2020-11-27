import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const routers: AppRouteModule = {
  layout: {
    path: '/account-manage',
    name: 'account-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/account-manage/center',
    meta: {
      title: '个人管理',
      icon: 'ant-design:user-outlined'
    },
  },

  routes: [
    {
      path: "center",
      name: 'center',
      component: (): unknown => import(`/@/views/pages/account-mange/center/index.vue`),
      meta: {
        title: '个人中心'
      },
    },
    {
      path: "setting",
      name: 'setting',
      component: (): unknown => import(`/@/views/pages/account-mange/setting/index.vue`),
      meta: {
        title: '个人设置'
      },
    },
  ]
}



export default routers