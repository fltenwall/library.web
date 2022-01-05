import { defineComponent, inject } from 'vue';
import { EditorForm } from '/@/lib/interface/EditorForm';
import ColorPicker from '/@/components/ColorPicker/index.vue';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: undefined
    },
    prop: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;
    // 	输入框内容变化时的回调
    function handlChange(value: string) {
      // 父组件更新
      emit('update:value', value);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);
    }

    return () => <ColorPicker value={props.value} onChange={handlChange} />;
  }
});
