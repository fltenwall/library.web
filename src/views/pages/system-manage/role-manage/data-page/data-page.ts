import type { FromRules } from '/@/lib/interface/From'

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  isDefault: [
    {
      type: 'number',
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ]
}
