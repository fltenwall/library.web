<template>
  <a-input-number
    v-model:value="inputValue"
    :min="0"
    class="input-number-wrap"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
    @change="onChange"
  />
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, PropType, ref, unref, watch, computed, toRefs } from 'vue';
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend';

const useinputReadonly = (readonly: Ref<boolean>) => {
  return computed(() => {
    const dataPage = injectDatapage();
    return readonly.value || dataPage.readonly?.value;
  });
};

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    type: {
      tpye: String,
      default: 'text',
      validator: (v: string): boolean => {
        return ['text', 'number'].includes(v);
      }
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const inputValue = ref<string | number>('');
    const { readonly } = toRefs(props);

    // 内容发送变化触发
    const onChange = () => {
      if (props.type === 'number') {
        inputValue.value = Number((inputValue.value as string).replace(/[^0-9]+/g, ''));
      }
      emit('update:value', inputValue.value);
    };

    const inputReadonly = useinputReadonly(readonly);

    watch(
      () => props.value,
      (newValue) => {
        if (unref(inputValue) === newValue) return;
        inputValue.value = newValue;
      },
      { immediate: true }
    );

    return { inputValue, inputReadonly, onChange };
  }
});
</script>

<style lang="less" scoped>
.input-number-wrap {
  width: 100%;
  color: rgba(0, 0, 0, 0.65);
  cursor: default;

  ::v-deep(input) {
    cursor: default;
  }
}
</style>
