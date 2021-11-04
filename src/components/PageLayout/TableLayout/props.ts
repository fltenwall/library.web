import type { PropType } from 'vue';
import type { Actions } from './interface';
import type { TableColumn } from '/@/lib/props/TableList';

export default {
  title: {
    type: String,
    default: ''
  },
  columns: {
    type: [Array] as PropType<TableColumn[]>,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  actions: {
    type: [Array, Boolean] as PropType<Actions[] | false>,
    default: false
  }
};
