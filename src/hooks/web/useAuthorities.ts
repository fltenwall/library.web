import { Auth } from '/@/router/types';
import { userStore } from '/@/store/modules/user';
import { Mode } from '/@/utils/helper/breadcrumb';
import { isArray } from '/@/utils/is';
import config from '/@/config/';

// 判断是否有权限
export function useAuthorities(val: string[] | Auth = [], mode?: Mode): boolean {
  const auth: string[] = !val ? [] : isArray(val) ? (val as string[]) : (mode && (val as Auth)[mode]) || [];

  const { authorities, superAdmin } = userStore.getUserInfoState!;

  if (auth?.length && config.auth && !superAdmin) {
    // 需要权限
    return auth.every((el) => !!authorities?.find((auth) => new RegExp(el).test(auth)));
  }

  return true;
}

export function showByAuth(auth: string | string[]): boolean {
  if (!auth) return true;

  return useAuthorities(isArray(auth) ? auth : [auth]);
}
