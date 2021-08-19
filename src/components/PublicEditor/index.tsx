import Vditor from 'vditor';
import { defineComponent, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue';

import 'vditor/dist/index.css';

import './index.less';

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
  emits: ['update:value', 'update:lineCount', 'update:initialized'],
  setup(props, { emit }) {
    const elementRef = ref<HTMLElement>();

    const vditor = ref<Vditor | null>(null);

    const isValueUpdateFromInner = ref<boolean>(false);

    const initedRef = ref(false);

    onMounted(() => {
      initialize();
    });

    onBeforeUnmount(() => {
      unref(vditor)?.destroy();
    });

    // 实例化
    function initialize() {
      const element = unref(elementRef);
      if (!element) return;

      vditor.value = new Vditor(element, {
        cache: { enable: false },
        input: (v: string) => handleInput(v),
        after: () => {
          initedRef.value = true;
          unref(vditor)?.setValue(props.value);
        },
        preview: { actions: [], mode: 'both' },
        ...props.configs
      });
    }

    // 用户输入
    function handleInput(val: string) {
      isValueUpdateFromInner.value = true;
      emit('update:value', val);
    }

    watch(
      () => props.value,
      (val) => {
        if (isValueUpdateFromInner.value) {
          isValueUpdateFromInner.value = false;
        } else {
          initedRef.value && unref(vditor)?.setValue(val);
        }
      }
    );

    return () => (
      <div class="public-editor">
        <div ref={elementRef} />
      </div>
    );
  }
});
