import type { FromRules } from '/@/lib/interface/From';

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  startDate: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  endDate: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  delayValue: [
    {
      type: 'number',
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  delayUnit: [
    {
      type: 'number',
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

export const selectUnitOption = [
  { value: 1, label: '年' },
  { value: 2, label: '季' },
  { value: 3, label: '月' },
  { value: 4, label: '周' },
  { value: 5, label: '日' }
];
