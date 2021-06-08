import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  // 标题
  title?: string

  // 忽略身份验证
  ignoreAuth?: boolean

  // 权限
  auth?: string[] | Auth

  // 缓存页面
  keepAlive?: boolean

  // 忽略标签缓存
  ignoreTabKeepAlive?: boolean

  // 菜单隐藏
  hideInMenu?: boolean

  // 隐藏标签
  hideInTab?: boolean

  // 页面重定向
  redirect?: string

  // 图标
  icon?: string

  // 固定标签
  affix?: boolean

  // 忽略标签
  ignoreTab?: boolean

  // 允许 子路由为空,
  allowChildNull?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'name' | 'redirect'> {
  name: string

  meta: RouteMeta

  children?: AppRouteRecordRaw[]

  redirect?: { name: string }

  props?: unknown
}

export interface AppRouteModule {
  layout: AppRouteRecordRaw

  routes: AppRouteRecordRaw[]

  sortValue: number
}

export interface Menu extends RouteMeta {
  name?: string | symbol

  title?: string

  path: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: RoleEnum[]
}

export interface FlatMenu {
  path: string

  name: string

  meta?: RouteMeta
}

export interface Auth {
  new?: string[]

  edit?: string[]

  view?: string[]
}
