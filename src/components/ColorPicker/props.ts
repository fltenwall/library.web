import type { PropType } from 'vue';

export default {
  format: {
    type: String as PropType<'hex' | 'rgb'>,
    default: 'rgb'
  },
  value: {
    type: String,
    default: ''
  }
};
