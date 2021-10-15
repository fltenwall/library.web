import type { TableColumn } from '/@/lib/props/TableList';

export const tableColumns: TableColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'show',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'show' }
  },
  {
    title: '排序值',
    dataIndex: 'sortValue',
    align: 'center',
    ellipsis: true
  },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'icon' }
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
