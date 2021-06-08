import type { TableColumn } from '/@/lib/props/TableList'

export const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'username',
    align: 'center',
    ellipsis: true
  },
  {
    title: '超级管理员',
    dataIndex: 'superAdmin',
    align: 'center',
    width: 100,
    ellipsis: true,
    slots: { customRender: 'superAdmin' }
  },
  {
    title: '用户状态',
    dataIndex: 'enabled',
    align: 'center',
    ellipsis: true,
    width: 100,
    slots: { customRender: 'enabled' }
  },

  {
    title: '用户名称',
    dataIndex: 'nickname',
    align: 'center',
    ellipsis: true
  },
  {
    title: '性别',
    dataIndex: 'sex.label',
    align: 'center',
    width: 100,
    ellipsis: true
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    align: 'center',
    ellipsis: true
  },
  {
    title: '邮件地址',
    dataIndex: 'email',
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
