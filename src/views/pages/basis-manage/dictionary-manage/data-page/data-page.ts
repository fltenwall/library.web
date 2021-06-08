import type { FromRules } from '/@/lib/interface/From'
import type { TableColumn } from '/@/lib/props/TableList'

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
}

export const selectOption = [
  { value: 1, label: '正常' },
  { value: 0, label: '停用' }
]

export const dataTypeColumn: TableColumn[] = [
  {
    title: '字典编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true
  },
  {
    title: '数据标签',
    dataIndex: 'label',
    align: 'center',
    ellipsis: true
  },
  {
    title: '数据键值',
    dataIndex: 'value',
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'state' }
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    ellipsis: true,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

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
}
