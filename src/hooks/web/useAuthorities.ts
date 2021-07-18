import { Auth } from '/@/router/types'
import { userStore } from '/@/store/modules/user'
import { Mode } from '/@/utils/helper/breadcrumb'
import { isString, isArray } from '/@/utils/is'
import config from '/@/config/'

// 判断是否有权限
export function useAuthorities(val: string[] | Auth = [], mode?: Mode): boolean {
  const auth: string[] = !val
    ? []
    : isArray(val)
    ? (val as string[])
    : (mode && (val as Auth)[mode]) || []

  const { authorities, superAdmin } = userStore.getUserInfoState!

  return auth?.length && config.auth && !superAdmin
    ? auth.every((el) => authorities?.includes(el))
    : true
}

export function showByAuth(auth: string): boolean {
  if (!auth || !isString(auth)) return true
  return useAuthorities([auth])
}
