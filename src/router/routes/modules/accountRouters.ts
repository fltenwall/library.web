import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

/**
 * @description  所有路由已 name 字段 作为 key 值,在注册路由时, 会拼接 layout.name + routes.name
 */

const routers: AppRouteModule = {
  layout: {
    path: 'account-manage',
    name: 'account-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'center' },
    meta: {
      title: '个人管理',
      icon: 'ant-design:user-outlined'
    }
  },

  routes: [
    {
      path: 'center',
      name: 'center',
      component: (): unknown => import('/@/views/pages/account-mange/center/index.vue'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: 'setting',
      name: 'setting',
      component: (): unknown => import('/@/views/pages/account-mange/setting/index.vue'),
      meta: {
        title: '个人设置',
        allowChildNull: true
      },
      redirect: { name: 'account-manage-setting-base' },
      children: [
        {
          path: 'base',
          name: 'base',
          component: (): unknown => import('/@/views/pages/account-mange/setting/components/base.vue'),
          meta: {
            title: '基本设置',
            hideInMenu: true,
            hideInTab: true
          }
        },
        {
          path: 'security',
          name: 'security',
          component: (): unknown => import('/@/views/pages/account-mange/setting/components/security.vue'),
          meta: {
            title: '安全设置',
            hideInMenu: true,
            hideInTab: true
          }
        },
        {
          path: 'custom',
          name: 'custom',
          component: (): unknown => import('/@/views/pages/account-mange/setting/components/custom.vue'),
          meta: {
            title: '个性化设置',
            hideInMenu: true,
            hideInTab: true
          }
        },
        {
          path: 'binding',
          name: 'binding',
          component: (): unknown => import('/@/views/pages/account-mange/setting/components/binding.vue'),
          meta: {
            title: '账户绑定',
            hideInMenu: true,
            hideInTab: true
          }
        }
      ]
    }
  ],
  sortValue: 6
}

export default routers
