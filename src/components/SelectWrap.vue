<template>
  <a-select
    class="select-wrap"
    :value="selected"
    :disabled="inputReadonly"
    :placeholder="inputReadonly ? '' : placeholder"
    @select="onSelect"
  >
    <slot />
  </a-select>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue';
import { defineComponent, computed, toRefs } from 'vue';
import { isBoolean } from '../utils/is';
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend';

const useinputReadonly = (readonly: Ref<boolean | undefined>, isReadonly: Ref<boolean>) => {
  const dataPage = injectDatapage();
  return computed(() => {
    return readonly.value || (isReadonly.value && dataPage.readonly?.value);
  });
};

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    isReadonly: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String, Boolean],
      default: undefined
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const { readonly, isReadonly } = toRefs(props);

    const inputReadonly = useinputReadonly(readonly, isReadonly);

    const onSelect = (value: unknown) => emit('update:value', value);

    const selected = computed(() => (isBoolean(props.value) ? (props.value ? 1 : 0) : props.value));

    return { inputReadonly, selected, onSelect };
  }
});
</script>

<style lang="less" scoped>
.select-wrap {
  ::v-deep(.ant-select-selector) {
    color: rgba(0, 0, 0, 0.65) !important ;
    cursor: default !important;

    input {
      cursor: default !important;
    }

    .ant-select-selection-item {
      user-select: auto;
    }
  }

  ::v-deep(.ant-select-arrow) {
    cursor: default !important;
  }
}
</style>
