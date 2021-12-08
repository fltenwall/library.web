import type { PropType } from 'vue';
import { defineComponent, inject, ref, watch } from 'vue';
import { Input } from 'ant-design-vue';
import { EditorForm } from '/@/lib/interface/EditorForm';

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (v: string): boolean => ['text', 'number'].includes(v)
    },
    size: {
      type: String as PropType<'small'>,
      default: 'default'
    },
    min: {
      type: Number as PropType<number>,
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    const input = ref<string | number>(props.value);
    // 是否内部更新, 内部更新不更新数据
    let isValueUpdateFromInner = false;

    // 	输入框内容变化时的回调
    function handlChange(e: InputEvent) {
      isValueUpdateFromInner = true;
      const value = (e.target! as HTMLInputElement).value;
      // 更新视图
      input.value = value;
      // 父组件更新
      emit('update:value', props.type === 'number' ? +value.replace(/[^0-9]+/g, '') : value);
      // 传递改变数据
      instance.changeTrigger?.(props.prop);
    }

    // 输入框失去焦点, 同步数据
    function handleBlur() {
      input.value = props.value;
    }

    watch(
      () => props.value,
      (val) => {
        if (isValueUpdateFromInner) {
          isValueUpdateFromInner = false;
        } else {
          input.value = val;
        }
      }
    );

    return () => (
      <Input
        value={input.value}
        placeholder={props.placeholder}
        size={props.size}
        onChange={handlChange}
        onBlur={handleBlur}
      />
    );
  }
});
