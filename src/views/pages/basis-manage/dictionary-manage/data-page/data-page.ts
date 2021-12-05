import type { FromRules } from '/@/lib/interface/From';
import type { TableColumn } from '/@/lib/props/TableList';

export const formRules: FromRules = {
  name: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  type: [
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

export const dataTypeColumn: TableColumn[] = [
  {
    title: '数据标签',
    dataIndex: 'label',
    align: 'center'
  },
  {
    title: '数据键值',
    dataIndex: 'value',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center'
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    ellipsis: true
  }
];

export const dictDetailRules: FromRules = {
  label: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ],
  value: [
    {
      required: true,
      whitespace: true,
      message: '不允许为空'
    }
  ]
};
