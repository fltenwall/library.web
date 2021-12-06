import type { PropType } from 'vue';

export const tableProps = {
  columns: {
    type: [Array] as PropType<TableColumn[]>,
    default: null
  },
  dataSource: {
    type: Array as PropType<{ id?: string }[]>,
    default: []
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record: unknown) => string)>,
    default: 'id'
  },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: {}
  },
  rowSelection: {
    type: Object,
    default: undefined
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  }
};

export const tableListProps = {
  ...tableProps,
  download: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  templateLink: {
    type: String,
    default: ''
  }
};

export interface TableColumn {
  dataIndex: string | string[];

  key?: string;

  title: string;

  width?: number;

  align?: 'left' | 'right' | 'center';

  ellipsis?: boolean | { showTitle?: boolean };

  fixed?: boolean | 'left' | 'right';
}

export interface Options {
  label: string;
  value: string;
}

export interface State {
  indeterminate: boolean;
  checkAll: boolean;
  checkedList: string[];
  defaultCheckList: string[];
}
