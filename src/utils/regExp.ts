/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from './is'

export const rules = {
  digital: /^\d*$/,

  telephone: /^1\d{10}$/,

  dataPage: /data-page$/,

  whitespace: /^\s*|\s*$/g,

  email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,

  username: /^[A-Za-z0-9]+([-]?[A-Za-z0-9]+)*$/
}

interface Parameter {
  data: string
  rule: 'telephone' | 'dataPage' | 'digital'
}

// 检查数据
export function validData({ data, rule }: Parameter): boolean {
  return rules[rule].test(data)
}

// 系统模块 path -> 模块
export function queryModule(path: string): string {
  const mapState = {
    dict: '字典管理',
    problem: '问题管理',
    'anonymous/problem': '帮助中心',
    modular: '模块管理',
    authority: '权限列表',
    role: '角色管理',
    search: '图书搜索',
    'user/register': '用户注册',
    'user/password': '用户密码修改',
    user: '用户管理',
    date: '日期管理',
    quick: '快捷方式',
    form: '表单管理',
    preview: '预览',
    'material/image/classify': '素材管理-图片分组',
    'material/image': '素材管理-图片'
  }
  const mapKey = Reflect.ownKeys(mapState)
  const key = mapKey.find((value: string) => new RegExp(value).test(path))

  return isString(key) ? (mapState as any)[key] : '未知模块'
}
