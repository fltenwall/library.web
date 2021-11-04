<template>
  <a-input :placeholder="placeholder" allow-clear @pressEnter="handleEnterEvent" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInject as injectPageLayout } from '/@/components/PageLayout/useDepend';
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend';

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  setup() {
    const listPage = injectListPage();

    const pageLayout = injectPageLayout();

    // 回车时间
    const handleEnterEvent = () => {
      listPage?.onFetchData?.();

      pageLayout?.onSearchData?.();
    };

    return { handleEnterEvent };
  }
});
</script>

<style lang="less" scoped></style>
