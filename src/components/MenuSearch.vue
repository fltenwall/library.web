<template>
  <search-outlined class="pr-2" @click="handleSearchClick" />
  <menu-select
    :style="selectStyle"
    class="no-border menu-search-select"
    @on-select="handleSelect"
    @on-blur="handleBlur"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue';

import { useGo } from '/@/hooks/web/usePage';
import MenuSelect from '/@/components/MenuSelect.vue';

export default defineComponent({
  components: { MenuSelect },
  setup() {
    const isSearch = ref<boolean>(false);

    const go = useGo();

    // 被选中时调用，参数为选中项的 value (或 key) 值
    function handleSelect(value: string) {
      go({ name: value });
    }

    // 处理菜单点击
    function handleSearchClick() {
      isSearch.value = true;
    }

    // 处理失去焦点
    function handleBlur() {
      isSearch.value = false;
    }

    const selectStyle = computed(() => {
      return { width: unref(isSearch) ? '200px' : '0px' };
    });

    return {
      selectStyle,
      handleBlur,
      handleSelect,
      handleSearchClick
    };
  }
});
</script>

<style lang="less" scoped>
.menu-search-select {
  transition: width 0.5s ease;

  ::v-deep(.ant-select-selector) {
    padding: 0 !important;

    .ant-select-selection-search {
      inset: 0;
    }
  }
}
</style>
