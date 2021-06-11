<template>
  <TableList
    title="问题列表"
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

    <template #show="{ record }">
      <a-tag v-if="record.state" color="#108ee9">
        可 见
      </a-tag>
      <a-tag v-else color="#f50">
        不可见
      </a-tag>
    </template>

    <template #icon="{ record }">
      <Icon v-if="record.icon" :icon="record.icon" />
    </template>

    <template #updateTime="{ record }">
      {{ MixinUseMoment(record.updateTime, 'YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span @click="onDeleteDataItem(record)">删除</span>
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
import { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<ProblemManage[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<ProblemManage>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: ProblemManage) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: ProblemManage) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: ProblemManage) => listPage.onDeleteDataItem(record)

    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: ProblemManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
