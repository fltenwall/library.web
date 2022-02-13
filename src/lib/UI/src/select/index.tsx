import type { PropType } from 'vue';
import { Select } from 'ant-design-vue';
import { EditorForm } from '/@/lib/interface/EditorForm';

export default defineComponent({
  props: {
    value: {
      type: [String, Number, Array] as PropType<string | number | string[] | number[]>,
      default: undefined
    },
    prop: {
      type: String,
      default: ''
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array as PropType<{ value: string | number; label: string }[]>,
      default: () => []
    }
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    // 	输入框内容变化时的回调
    function handlChange(value: string) {
      // 父组件更新
      emit('update:value', value);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);

      emit('change', value);
    }

    return () => (
      <div>
        <Select
          value={props.value}
          class="w-full"
          placeholder={props.placeholder}
          get-popup-container={(triggerNode: Node) => triggerNode.parentNode}
          allowClear={props.allowClear}
          options={props.options}
          onChange={handlChange}
        />
      </div>
    );
  }
});
