import type { PropType } from 'vue';
import type { TableColumn } from '/@/lib/props/TableList';
import type { SearchOptions } from './SearchLayout/interface';
import type { Actions } from './TableLayout/interface';
import { PagerQueryData, ResponseData } from '/@/lib/http/axios/types';

export default {
  name: {
    type: String,
    default: ''
  },
  searchOptions: {
    type: Array as PropType<SearchOptions[]>,
    default: (): SearchOptions[] => []
  },
  tableColumns: {
    type: [Array] as PropType<TableColumn[]>,
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  onFetchData: {
    type: Function as PropType<(query: PagerQueryData) => Promise<ResponseData<unknown>>>,
    default: undefined
  },
  onDeleteData: {
    type: Function as PropType<(id: number) => Promise<void>>,
    default: undefined
  },
  tableActions: {
    type: [Array, Boolean] as PropType<Actions[] | false>,
    default: false
  }
};
