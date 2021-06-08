import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '日期名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true
  },
  {
    title: '日期范围',
    dataIndex: 'date',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'date' }
  },
  {
    title: '延迟时间',
    dataIndex: 'delay',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'delay' }
  },
  {
    title: '状态',
    dataIndex: 'createBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '备注',
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

export const selectUnitOption = [
  { value: 1, label: '年' },
  { value: 2, label: '季' },
  { value: 3, label: '月' },
  { value: 4, label: '周' },
  { value: 5, label: '日' }
]
