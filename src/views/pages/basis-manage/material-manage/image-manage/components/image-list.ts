import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true,
    slots: { customRender: 'name' }
  },
  {
    title: '日期',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'updateTime' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    width: 132,
    slots: { customRender: 'type' }
  },
  {
    title: '大小',
    dataIndex: 'size',
    align: 'center',
    ellipsis: true,
    width: 132,
    slots: { customRender: 'size' }
  },
  {
    title: '图片',
    dataIndex: 'image',
    align: 'center',
    width: 132,
    slots: { customRender: 'image' }
  },
  {
    title: '操作',
    align: 'center',
    width: 100,
    ellipsis: true,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]
