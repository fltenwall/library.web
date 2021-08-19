<template>
  <a-textarea
    v-model:value="inputValue"
    class="textarea-wrap"
    :disabled="inputReadonly"
    :auto-size="{ minRows: 2, maxRows: 5 }"
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
      type: String as PropType<string>,
      default: ''
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const inputValue = ref<string>('');
    const { readonly } = toRefs(props);

    // 内容发送变化触发
    const onChange = () => emit('update:value', inputValue.value);

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
.textarea-wrap {
  // min-width: 505.5px;

  ::v-deep(.ant-input[disabled]) {
    color: rgba(0, 0, 0, 0.65);
    cursor: default;
  }
}
</style>
