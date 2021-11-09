import type { FromRules } from '/@/lib/interface/From';

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ]
};

export const stateSelectOption = [
  { value: 1, label: '正常' },
  { value: 0, label: '停用' }
];

export const modeSelectOption = [
  { value: 1, label: '移动端' },
  { value: 2, label: 'PC端' }
];

export const layoutSelectOption = [
  { value: 1, label: '自由布局' },
  { value: 2, label: '弹性布局' }
];

export const selectUnitOption = [
  { value: 1, label: '年' },
  { value: 2, label: '季' },
  { value: 3, label: '月' },
  { value: 4, label: '周' },
  { value: 5, label: '日' }
];
