<template>
  <Table
    class="global-table"
    bordered
    :loading="loading"
    :row-key="rowKey"
    :columns="tableColumns"
    :data-source="dataSource"
    :pagination="pagination"
    :scroll="scroll"
    :row-selection="rowSelection"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data" />
    </template>
  </Table>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, unref } from 'vue'
import { Table } from 'ant-design-vue'
import { tableProps } from '/@/lib/props/TableList'
import { injectDatapage } from '/@/lib/idata/data-page/methods/useDepend'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  components: { Table },
  props: tableProps,
  setup(props) {
    const { columns } = toRefs(props)

    const tableColumns = computed(() => {
      const { readonly } = injectDatapage()
      const newColumns = cloneDeep(unref(columns))
      if (readonly?.value) newColumns.pop()
      return newColumns
    })

    return { tableColumns }
  }
})
</script>

<style lang="less" scoped>
::v-deep(.ant-table-tbody) {
  & > tr:first-of-type > td {
    border-top: 1px solid #f0f0f0;
  }
}

::v-deep(.ant-table-thead) {
  & > tr > th {
    font-weight: bold;
    border-bottom-width: 0;
  }

  & > tr:only-child > th:last-child {
    border-right-color: #f0f0f0 !important;
  }
}

::v-deep(.ant-table-header) {
  margin-bottom: -17px !important;
}
</style>
