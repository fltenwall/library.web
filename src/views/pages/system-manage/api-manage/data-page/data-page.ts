import type { FromRules } from '/@/lib/interface/From';

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  path: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ]
};

export const selectOption = [
  { value: 1, label: '正常' },
  { value: 0, label: '停用' }
];

export const isOption = [
  { value: 1, label: '是' },
  { value: 0, label: '否' }
];

export const methodOption = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' }
];
