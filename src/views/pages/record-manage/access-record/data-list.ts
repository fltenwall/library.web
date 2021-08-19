import type { TableColumn } from '/@/lib/props/TableList';

export const tableColumns: TableColumn[] = [
  {
    title: '访问标识',
    dataIndex: 'identify',
    align: 'center',
    ellipsis: true
  },
  {
    title: '访问地址',
    dataIndex: 'ip',
    align: 'center',
    ellipsis: true
  },
  {
    title: '访问地点',
    dataIndex: 'location',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'location' }
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
    title: '访问日期',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'createTime' }
  }
];
