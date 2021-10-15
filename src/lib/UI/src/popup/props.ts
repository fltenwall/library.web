import type { PropType } from 'vue';

export default {
  position: {
    type: String as PropType<'absolute'>,
    default: 'absolute'
  },
  gpuAcceleration: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  }
};
