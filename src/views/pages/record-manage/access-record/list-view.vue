<template>
  <TableList
    title="访问日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @on-refresh="onRefresh"
  >
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>

    <template #location="{ record }">
      <div class="location">
        <span v-if="record.ipRecord.nation">{{ record.ipRecord.nation }}</span>
        <span v-if="record.ipRecord.province">{{ record.ipRecord.province }}</span>
        <span v-if="record.ipRecord.city">{{ record.ipRecord.city }}</span>
        <span v-if="record.ipRecord.district">{{ record.ipRecord.district }}</span>
      </div>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { AccessRecord } from '/@/api/record-manage/access-record'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { useFromatlll } from '/@/utils/dateFormat'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<AccessRecord[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    // 页面方法
    const listPage = injectListPage<AccessRecord>()

    // 数据加载
    const loading = listPage.loading

    const { current, setPagination, getPagination } = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    return {
      loading,
      current,
      setPagination,
      getPagination,
      dataSource,
      totalElements,
      tableColumns,
      useFromatlll,
      onPageChange,
      onRefresh
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: AccessRecord[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped>
.location {
  span:not(:last-of-type) {
    margin: 0 10px 0 0;
  }
}
</style>
