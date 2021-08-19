import type { PropType } from 'vue';
import type { ColumnProps } from 'ant-design-vue/lib/table/interface';

export const importProps = {
  columns: {
    type: [Array] as PropType<ColumnProps[]>,
    default: null
  },
  // 数据
  dataSource: {
    type: Array as PropType<unknown[]>,
    default: []
  },
  // 对话框宽度
  width: {
    type: [Number, String] as PropType<number | string>,
    default: '80%'
  },
  rowKey: {
    type: String as PropType<string>,
    default: 'id'
  },
  // 显示隐藏
  value: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

// 选中的数据
export interface SelectedData {
  selectedRows?: unknown[];
  selectedRowKeys?: number[];
}
