import type { FromRules } from '/@/lib/interface/From'

export const formRules: FromRules = {
  title: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ]
}

// 编辑器配置
export const editorConfigs = {
  height: 500,
  mode: 'sv'
}

export const selectOption = [
  { value: 1, label: '可见' },
  { value: 0, label: '不可见' }
]
