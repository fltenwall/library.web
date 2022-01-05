import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import { Radio } from 'ant-design-vue';
import { EditorForm } from '/@/lib/interface/EditorForm';

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    prop: {
      type: String,
      default: ''
    },
    options: {
      type: Array as PropType<{ label: string | number; value: string | number }[]>,
      default: () => []
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    function renderRadioButton() {
      return props.options.map((el) => <Radio.Button value={el.value}>{() => el.label}</Radio.Button>);
    }

    // 	输入框内容变化时的回调
    function handlChange(e: { target: { value: string } }) {
      // 父组件更新
      emit('update:value', e.target.value);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);
    }

    return () => (
      <Radio.Group value={props.value} onChange={handlChange}>
        {renderRadioButton()}
      </Radio.Group>
    );
  }
});
