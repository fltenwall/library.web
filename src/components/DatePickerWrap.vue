<template>
  <a-date-picker
    v-model:value="inputValue"
    class="date-picker-wrap"
    :disabled="inputReadonly"
    :get-calendar-container="(triggerNode) => triggerNode.parentNode"
    :placeholder="inputReadonly ? '' : placeholder"
    :value-format="'YYYY年MM月DD日'"
    :format="'YYYY年MM月DD日'"
    :show-today="false"
    :disabled-date="disabledDate"
    @change="onChange"
  />
</template>

<script lang="ts">
import type { Ref } from 'vue';
import moment, { Moment } from 'moment';
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
      default: undefined
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    endDate: {
      type: String,
      default: undefined
    },
    startDate: {
      type: String,
      default: undefined
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
      (newValue: string) => {
        if (unref(inputValue) === newValue) return;
        inputValue.value = newValue;
      },
      { immediate: true }
    );

    // 禁用时间
    function disabledDate(currentDate: Moment) {
      if (!currentDate) return false;

      // 有结束时间
      if (props.endDate) return moment(props.endDate, 'YYYY年MM月DD日').isBefore(currentDate);

      // 有开始时间
      if (props.startDate) return moment(props.startDate, 'YYYY年MM月DD日').isAfter(currentDate);

      return false;
    }

    return { inputValue, inputReadonly, onChange, disabledDate };
  }
});
</script>

<style lang="less" scoped>
.date-picker-wrap {
  width: 100%;

  ::v-deep(.ant-input[disabled]) {
    color: rgba(0, 0, 0, 0.65);
    cursor: default;
  }
}
</style>
