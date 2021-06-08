import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '日志编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作人员',
    dataIndex: 'username',
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
    title: '请求方式',
    dataIndex: 'httpMethod',
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
    title: '响应时间',
    dataIndex: 'executionTime',
    align: 'center',
    ellipsis: true
  },
  {
    title: '浏览器',
    dataIndex: 'client',
    align: 'center',
    ellipsis: true
  },
  {
    title: '操作系统',
    dataIndex: 'operatingSystem',
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
