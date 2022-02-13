import { Input } from 'ant-design-vue';
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
    placeholder: {
      type: String,
      default: '请输入'
    },
    autosize: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    // 	输入框内容变化时的回调
    function handlChange(e: { target: { value: string } }) {
      // 父组件更新
      emit('update:value', e.target.value);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);
    }

    return () => (
      <Input.TextArea
        value={props.value}
        placeholder={props.placeholder}
        autoSize={{ minRows: 3, maxRows: 3 }}
        onChange={handlChange}
      />
    );
  }
});
