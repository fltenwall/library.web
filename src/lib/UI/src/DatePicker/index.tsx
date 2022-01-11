import { computed } from 'vue';
import { defineComponent, inject } from 'vue';
import { DatePicker } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { EditorForm } from '/@/lib/interface/EditorForm';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: undefined
    },
    prop: {
      type: String,
      default: ''
    },
    showTime: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD HH:mm:ss'
    },
    defaultTime: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;

    // 	输入框内容变化时的回调
    function handlChange(date: Dayjs) {
      // 父组件更新
      emit('update:value', date?.format(props.format));
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);
    }

    const value = computed<Dayjs | undefined>(() => (props.value ? dayjs(props.value) : undefined));

    const defaultTime = computed(() => dayjs(props.defaultTime || '00:00:00', 'HH:mm:ss'));

    const showTime = computed(() => (props.showTime ? { defaultValue: defaultTime.value } : false));

    return () => (
      <DatePicker
        value={value.value}
        showTime={showTime.value}
        allowClear={props.allowClear}
        onChange={handlChange}
      />
    );
  }
});
