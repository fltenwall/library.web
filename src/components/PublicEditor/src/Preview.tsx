import Vditor from 'vditor';
import { defineComponent, ref, unref, watch } from 'vue';

import 'vditor/dist/index.css';

export default defineComponent({
  props: {
    configs: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const elementRef = ref();

    const vditor = ref();

    const isValueUpdateFromInner = ref<boolean>(false);

    // 实例化
    function initialize() {
      const element = unref(elementRef);
      if (!element) return;
      vditor.value = Vditor.preview(element, props.value, {
        mode: 'dark',
        ...props.configs
      });
    }

    watch(
      () => props.value,
      () => {
        if (isValueUpdateFromInner.value) {
          isValueUpdateFromInner.value = false;
        } else {
          initialize();
        }
      }
    );

    return () => (
      <div class="p4">
        <div ref={elementRef} />
      </div>
    );
  }
});
