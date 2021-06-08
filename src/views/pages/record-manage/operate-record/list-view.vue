<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @on-refresh="onRefresh"
  >
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>

    <template #status="{ record }">
      <span v-if="record.status === 'SUCCESS'" color="#19be6b"> 成功 </span>
      <span v-else-if="record.status === 'FAIL'" color="#ed4014"> 失败 </span>
      <span v-else color="#ed4014"> - </span>
    </template>

    <template #action="{ record }">
      <div class="index-operation">
        <span @click="onDetailsDataItem(record)">详情</span>
      </div>
    </template>

    <template #systemModule="{ record }">
      <div>
        {{ queryModule(record.path) }}
      </div>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
  <modal-details v-model:visible="dataDetails.visible" :data="dataDetails.dataItem" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { tableColumns } from './data-list'
import { OperatorRecord } from '/@/api/record-manage/operator-record'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { useFromatlll } from '/@/utils/dateFormat'
import { usePagination } from '/@/hooks/web/usePagination'
import { queryModule } from '/@/utils/regExp'
import modalDetails from './components/modal-details.vue'

export default defineComponent({
  components: { modalDetails },
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<OperatorRecord[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    // 对话框
    const dataDetails = reactive<{ visible: boolean; dataItem?: OperatorRecord }>({ visible: false })

    // 详情数据
    // const detailsDataItem =

    // 页面方法
    const listPage = injectListPage<OperatorRecord>()

    // 数据加载
    const loading = listPage.loading

    // 分页方法
    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    // 对话框处理
    const onDetailsDataItem = (record: OperatorRecord) => {
      dataDetails.visible = true
      dataDetails.dataItem = record
    }

    return {
      loading,
      dataSource,
      dataDetails,
      queryModule,
      ...pagination,
      totalElements,
      tableColumns,
      useFromatlll,
      onRefresh,
      onPageChange,
      onDetailsDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: OperatorRecord[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
