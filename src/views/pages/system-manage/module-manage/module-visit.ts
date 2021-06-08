import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '权限项名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '权限项',
    dataIndex: 'authorities',
    align: 'center',
    slots: { customRender: 'authorities' }
  },
  {
    title: '操作',
    align: 'center',
    width: 80,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]
