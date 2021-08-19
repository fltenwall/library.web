import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { getRouteModule } from '/@/utils/helper/route';
import { PageEnum } from '/@/enums/pageEnum';

import { DEFAULT_LAYOUT_COMPONENT } from '../constant';
import {
  OverviewPage,
  NoFountPage,
  IndexPage,
  Forbidden,
  AnalysisPage
} from './default/indexRoutes';
import { FrameRouters } from './default/frameRouters';

// 路由
const modulesRouters = import.meta.globEager('./modules/**.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modulesRouters).forEach((key) => routeModuleList.push(modulesRouters[key].default));

const routeList = [OverviewPage, AnalysisPage, ...getRouteModule(routeModuleList)];

// 获取菜单 树级
export const getRouteList = (): AppRouteRecordRaw[] => {
  return routeList;
};

// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: { name: PageEnum.BASE_HOME },
  meta: {
    title: '首页'
  },
  children: routeList
};

const indexRoute = [Forbidden, NoFountPage];

export const basicRoutes = [...FrameRouters, IndexPage, RootRoute, ...indexRoute];
