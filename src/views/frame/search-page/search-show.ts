import type { TableColumn } from '/@/lib/props/TableList'

export const holdInfoColumns: TableColumn[] = [
  {
    title: '索书号',
    dataIndex: 'searchCode',
    align: 'center',
    ellipsis: true
  },
  {
    title: '存放位置',
    dataIndex: 'address',
    align: 'center',
    ellipsis: true,
    width: 260
  },
  {
    title: '馆藏状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'status' }
  },
  // {
  //   title: "应还时间",
  //   dataIndex: "backTime",
  //   align: "center",
  //   ellipsis: true
  // }
  // {
  //   title: "借阅次数",
  //   dataIndex: "borrowingTimes",
  //   align: "center",
  //   ellipsis: true
  // },
  // {
  //   title: "归还次数",
  //   dataIndex: "renewalTimes",
  //   align: "center",
  //   ellipsis: true
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'operation' }
  }
]
