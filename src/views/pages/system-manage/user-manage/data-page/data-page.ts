import type { FromRules } from '/@/lib/interface/From'

export const formRules: FromRules = {
  username: [{ required: true, whitespace: true, message: '不允许为空' }],
  enabled: [{ type: 'number', required: true, message: '不允许为空' }],
  roleId: [{ type: 'number', required: true, message: '不允许为空' }],
  mobile: [
    {
      required: true,
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (!value || /^1[3456789]\d{9}$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式错误')
      },
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      validator: (_rule: unknown, value: string): Promise<void> => {
        if (!value || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          return Promise.resolve()
        }
        return Promise.reject('格式错误')
      },
      trigger: 'blur'
    }
  ]
}

export const selectEnableOption = [
  { value: 0, label: '禁用' },
  { value: 1, label: '使用' }
]
