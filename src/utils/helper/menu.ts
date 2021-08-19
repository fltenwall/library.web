import type { Menu as MenuType, AppRouteRecordRaw, FlatMenu } from '/@/router/types';
import { getRouteList } from '/@/router/routes/';
import { routerHasChildren } from '/@/utils/helper/route';
import { cloneDeep } from 'lodash-es';
import { useAuthorities } from '/@/hooks/web/useAuthorities';

export function menuHasChildren(menuTreeItem: MenuType): boolean {
  return (
    Reflect.has(menuTreeItem, 'children') &&
    !!menuTreeItem.children &&
    menuTreeItem.children.some((el) => !el.hideInMenu)
  );
}

// 通过用户权过滤菜单
export function getAuthFilterMenus(isFilterHide = true): AppRouteRecordRaw[] {
  const routeList = getRouteList();

  return authFilterMenus(cloneDeep(routeList), isFilterHide);
}

// 通过权限和菜单展示条件过滤菜单
export function authFilterMenus(
  menus: AppRouteRecordRaw[],
  isFilterHide = true
): AppRouteRecordRaw[] {
  const data: AppRouteRecordRaw[] = [];
  for (const el of menus) {
    const { auth, hideInMenu, allowChildNull } = el.meta;
    const result = useAuthorities(auth);
    if (!result || (isFilterHide && hideInMenu)) continue;
    if (!routerHasChildren(el)) {
      data.push(el);
      continue;
    }
    const children = authFilterMenus(el.children!, isFilterHide);
    if (children.length || allowChildNull) {
      el.children = children;
      data.push(el);
    }
  }
  return data;
}

// 获取菜单
export function getMenus(isFilterHide = true): MenuType[] {
  const routeList = getAuthFilterMenus(isFilterHide);
  return getMenuItem(routeList);
}

// 获取深层扁平化菜单
export function getFlatMenus(isFilterHide = true): FlatMenu[] {
  const routeList = getAuthFilterMenus(isFilterHide);
  return flatMenus(routeList, '');
}

// 获取深层过滤不显示扁平化菜单
export function getFilterIconFlatMenus(): FlatMenu[] {
  const menus = getFlatMenus(true);

  return menus.filter((el) => !el.meta?.icon);
}

// 获取全部父级路由名称
export function getAllParentPathName(treeData: FlatMenu[], name: string): string[] {
  const menuList = findPathName(treeData, name);
  return menuList.map((el) => el.name as string);
}

// 获取全部父级路由

export function getAllParentPath(treeData: FlatMenu[], name: string): FlatMenu[] {
  return findPathName(treeData, name);
}

function flatMenus(router: AppRouteRecordRaw[], parentPath = ''): FlatMenu[] {
  let result: FlatMenu[] = [];
  router.forEach((el) => {
    const currPath = `${parentPath}/${el.path}`.replace(/[/]{2,}/, '/');
    result.push({ name: el.name as string, path: currPath, meta: el.meta });
    if (routerHasChildren(el)) {
      result = result.concat(flatMenus(el.children!, currPath));
    }
  });
  return result;
}

function getMenuItem(menus: AppRouteRecordRaw[], parentPath = ''): MenuType[] {
  return menus.map((el: AppRouteRecordRaw) => {
    const { path, name, meta } = el;
    const currPath = `${parentPath}/${path}`.replace(/[/]{2,}/, '/');
    const item: MenuType = { path: currPath, name, ...meta };
    if (routerHasChildren(el)) {
      item.children = getMenuItem(el.children!, currPath);
    }
    return item;
  });
}

function findPathName(tree: FlatMenu[], name: string) {
  return tree.filter((el) => new RegExp(el.name).test(name));
}
