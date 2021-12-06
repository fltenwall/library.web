<template>
  <a-table
    class="global-table"
    :bordered="bordered"
    :loading="loading"
    :row-key="rowKey"
    :columns="tableColumns"
    :data-source="dataSource"
    :scroll="scroll"
    :row-selection="rowSelection"
  >
    <template #bodyCell="data">
      <slot name="bodyCell" v-bind="data" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from 'vue';
import { Table as aTable } from 'ant-design-vue';
import { tableProps } from '/@/lib/props/TableList';
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  components: { aTable },
  props: tableProps,
  setup(props) {
    const { columns } = toRefs(props);

    const tableColumns = computed(() => {
      const { readonly } = injectDatapage();
      const newColumns = cloneDeep(unref(columns));
      if (readonly?.value) newColumns.pop();
      return newColumns;
    });

    return { tableColumns };
  }
});
</script>

<style lang="less" scoped>
::v-deep(.ant-table-thead) {
  & > tr > th {
    font-weight: 600;

    &::before {
      background-color: transparent !important;
    }
  }
}
</style>
