import type { AppRouteRecordRaw } from '/@/router/types';

export const FrameRouters: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: (): unknown => import('/@/views/frame/login-page/index.vue'),
    meta: {
      title: '登录',
      ignoreAuth: true
    }
  },
  {
    path: '/login/choose-account',
    name: 'login-choose-account',
    component: (): unknown => import('/@/views/frame/login-page/choose-account/index.vue'),
    meta: {
      title: '选择登录帐号'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('/@/views/frame/help-page/index-page.vue'),
    meta: {
      title: '帮助中心',
      ignoreAuth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('/@/views/frame/search-page/index.vue'),
    meta: {
      title: '搜索',
      ignoreAuth: true
    }
  },
  {
    path: '/search/:id',
    name: 'search-show',
    component: () => import('/@/views/frame/search-page/search-show.vue'),
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: '/editor-text',
    name: 'editor-text',
    component: () => import('/@/views/frame/editor-page/text/index.vue'),
    meta: {
      title: '编辑',
      ignoreAuth: true
    }
  },
  {
    path: '/editor-form/:id',
    name: 'editor-form',
    component: () => import('/@/views/frame/editor-page/form/index.vue'),
    meta: {
      title: '编辑'
    }
  },
  {
    path: '/editor-activity/:id',
    name: 'editor-activity',
    component: () => import('/@/views/frame/editor-page/activity/index.vue'),
    meta: {
      title: '编辑'
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('/@/views/frame/reset-password/index.vue'),
    meta: {
      ignoreAuth: true,
      title: '密码重置'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('/@/views/frame/register-page/index-page.vue'),
    meta: {
      ignoreAuth: true,
      title: '注册'
    }
  }
];
