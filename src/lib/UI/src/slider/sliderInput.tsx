import { defineComponent, inject } from 'vue';
import { Slider } from 'ant-design-vue';
import { EditorForm } from '/@/lib/interface/EditorForm';
import UiInput from '/@/lib/UI/src/input/index';

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: undefined
    },
    prop: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form', {}) as EditorForm;
    // 	输入框内容变化时的回调
    function handlChange(value: number) {
      let val = value;
      if (value > props.max) {
        val = props.max;
      } else if (value < props.min) {
        val = props.min;
      }
      // 父组件更新
      emit('update:value', +val);
      // 传递改变数据
      props.prop && instance.changeTrigger?.(props.prop);
    }

    return () => (
      <div class="index-middle">
        <Slider
          value={props.value}
          class="flex-item"
          max={props.max}
          min={props.min}
          onChange={handlChange}
        />
        <UiInput
          value={props.value}
          class="w15 ml2"
          type="number"
          max={props.max}
          min={props.min}
          onChange={handlChange}
        />
      </div>
    );
  }
});
