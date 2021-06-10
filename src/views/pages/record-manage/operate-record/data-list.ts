import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '操作人员',
    dataIndex: 'account',
    align: 'center',
    ellipsis: true
  },
  {
    title: '主机',
    dataIndex: 'ip',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作地点',
    dataIndex: 'location',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'location' }
  },
  {
    title: '请求方式',
    dataIndex: 'method',
    align: 'center',
    ellipsis: true
  },
  {
    title: '系统模块',
    dataIndex: 'systemModule',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'systemModule' }
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'status' }
  },
  {
    title: '操作日期',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'createTime' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'action' }
  }
]
