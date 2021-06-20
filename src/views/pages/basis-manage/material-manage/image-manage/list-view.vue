<template>
  <div class="list-view">
    <div class="list-view-header">
      分组
    </div>
    <div class="flex-item flex flex-column list-view-cotent">
      <Scrollbar class="list-view-main">
        <div class="flex flex-space-between">
          <div>
            <a-button type="primary">
              上传图片
            </a-button>
          </div>
          <div class="operation-content">
            <a-checkbox> 当前页全选 </a-checkbox>
            <a-button class="ml-4">
              删除
            </a-button>
            <a-button class="ml-4">
              移动至
            </a-button>
            <a-button class="ml-4">
              重命名
            </a-button>
          </div>
        </div>
      </Scrollbar>
      <div class="list-view-footer">
        <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { ProblemManage } from '/@/api/basis-manage/problem-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'
import { Scrollbar } from '/@/components/Scrollbar'

export default defineComponent({
  components: { Scrollbar },
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

<style lang="less" scoped>
.list-view {
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 13px 20px;
  }

  &-main {
    flex: 1;
    height: 0;
  }

  &-cotent {
    padding: 16px;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 1230px) {
  .operation-content {
    display: none;
  }
}
</style>
