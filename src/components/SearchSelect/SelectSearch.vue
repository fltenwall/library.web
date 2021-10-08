<template>
  <a-select
    show-search
    class="select-search"
    :disabled="selectReadonly"
    :placeholder="selectReadonly ? '' : placeholder"
    :get-popup-container="(triggerNode) => triggerNode.parentNode"
    @change="onChange"
    @search="onSearch"
    @select="onSelect"
    @focus="onFocus"
  >
    <template #suffixIcon>
      <loading-outlined v-if="loading" />
      <search-outlined v-else />
    </template>
    <slot />
  </a-select>
</template>

<script lang="ts">
import type { Ref, PropType } from 'vue';
import { debounce } from 'lodash-es';
import { defineComponent, computed, toRefs, ref } from 'vue';
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend';
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend';

const useSelectReadonly = (readonly: Ref<boolean>) => {
  const dataPage = injectDatapage();
  return computed(() => {
    return readonly.value || dataPage.readonly?.value;
  });
};

export default defineComponent({
  props: {
    readonly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  emits: ['on-change', 'on-search', 'on-focus'],
  setup(props, { emit }) {
    const { readonly } = toRefs(props);
    // 加载
    const loading = ref<boolean>(false);
    // 方法
    const listPage = injectListPage();
    // 内容发送变化触发
    const onChange = (value: string, options: { key: number }) => {
      emit('on-change', value, options);
    };
    // 设置加载
    const setLoadState = (state: boolean) => (loading.value = state);
    // 处理加载
    const onSearch = (value: string) => {
      value && (setLoadState(true), useDebugger(value));
    };
    const useDebugger = debounce(
      (value: string) => emit('on-search', value, () => setLoadState(false)),
      1000
    );
    const selectReadonly = useSelectReadonly(readonly);

    const onSelect = () => listPage.onFetchData?.();

    const onFocus = () => emit('on-focus');

    return { selectReadonly, loading, onChange, onSearch, onSelect, onFocus };
  }
});
</script>

<style lang="less" scoped>
.select-search {
  width: 100%;
  min-width: 181.8px;

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

  ::v-deep(.ant-select-selection-item) {
    color: rgba(0, 0, 0, 0.65) !important;
    cursor: default !important;
  }

  ::v-deep(.ant-select-arrow) {
    cursor: default !important;
  }
}
</style>
