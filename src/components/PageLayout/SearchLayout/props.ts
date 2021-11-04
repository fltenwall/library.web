import type { PropType } from 'vue';
import type { SearchOptions } from './interface';

export default {
  options: {
    type: Array as PropType<SearchOptions[]>,
    default: (): SearchOptions[] => []
  }
};
