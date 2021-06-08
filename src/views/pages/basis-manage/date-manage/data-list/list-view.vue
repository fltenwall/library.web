<template>
  <TableList
    title="日期列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @onRefresh="onRefresh"
  >
    <template #header-left>
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span @click="onDeleteDataItem(record)">删除</span>
      </div>
    </template>

    <template #date="{ record }">
      <div>{{ record.startDate }} - {{ record.endDate }}</div>
    </template>

    <template #delay="{ record }">
      <div>{{ onDelayTime(record) }}</div>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { DateManage } from '/@/api/basis-manage/date-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'
import moment from 'moment'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<DateManage[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<DateManage>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: DateManage) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: DateManage) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: DateManage) => listPage.onDeleteDataItem(record)

    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    // 计算延迟时间
    const onDelayTime = ({ endDate, delayValue, delayUnit }: DateManage) => {
      const unit = ['y', 'Q', 'M', 'w', 'd'][delayUnit! - 1] as string
      return moment(endDate, 'YYYY年MM月DD日')
        .add(delayValue, unit as 'y')
        .format('YYYY年MM月DD日')
    }

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onDelayTime,
      onPageChange,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: DateManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
