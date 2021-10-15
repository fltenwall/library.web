import type { TableColumn } from '/@/lib/props/TableList';

export const tableColumns: TableColumn[] = [
  {
    title: '是否默认角色',
    dataIndex: 'isDefault',
    align: 'center',
    ellipsis: true,
    width: 80,
    slots: { customRender: 'isDefault' }
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    align: 'center',
    ellipsis: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'updateTime' }
  },
  {
    title: '操作',
    align: 'center',
    width: 170,
    fixed: 'right',
    ellipsis: true,
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
];
