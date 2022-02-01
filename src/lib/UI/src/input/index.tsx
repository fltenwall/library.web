import type { PropType } from 'vue';
import { defineComponent, inject, ref, watch } from 'vue';
import { Input, Button } from 'ant-design-vue';
import { EditorForm } from '/@/lib/interface/EditorForm';
import './index.less';

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
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    allowClear: {
      type: Boolean,
      defalut: false
    },
    readonly: {
      type: Boolean,
      defalut: false
    }
  },
  emits: ['update:value', 'change', 'blur'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    const input = ref<string | number>(props.value);
    // 是否内部更新, 内部更新不更新数据
    let isValueUpdateFromInner = false;

    // 	输入框内容变化时的回调
    function handlChange(e: InputEvent) {
      isValueUpdateFromInner = true;
      const value = (e.target! as HTMLInputElement).value;
      updateValue(props.type === 'number' ? parseFloat(value) || 0 : value);
    }

    // 处理输入框删除
    function handleClear() {
      isValueUpdateFromInner = true;

      updateValue('');
    }

    // 更新数据
    function updateValue(value: string | number) {
      // 更新视图
      input.value = value;
      // 父组件更新
      emit('update:value', value);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);

      emit('change', value);
    }

    // 输入框失去焦点, 同步数据
    function handleBlur() {
      if (props.type === 'number') {
        if (props.max && props.value > props.max) {
          updateValue(props.max);
        } else if (props.min && props.value < props.min) {
          updateValue(props.min);
        } else {
          input.value = props.value;
        }
      } else {
        input.value = props.value;
      }

      emit('blur', input.value);
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

    const closeButton = (
      <Button class="ui-input-close" onClick={handleClear}>
        删除
      </Button>
    );

    return () => (
      <div class="flex w-full">
        <Input
          value={input.value}
          placeholder={props.readonly ? '' : props.placeholder}
          size={props.size}
          readonly={props.readonly}
          onChange={handlChange}
          onBlur={handleBlur}
        />
        {!!input.value && props.allowClear && closeButton}
      </div>
    );
  }
});
