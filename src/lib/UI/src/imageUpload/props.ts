import type { PropType } from 'vue';
import type { Material } from './interface';

export default {
  prop: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: true
  },
  value: {
    type: [Array] as PropType<Material[]>,
    default: () => []
  }
};
