import type { TableColumn } from '/@/lib/props/TableList';

export const tableColumns: TableColumn[] = [
  {
    title: '模块路径',
    dataIndex: 'path',
    align: 'center',
    ellipsis: true
  },
  {
    title: '模块标识符',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true
  }
];
