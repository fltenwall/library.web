<template>
  <div class="list-view">
    <div class="list-view-header">
      {{ title }}
    </div>
    <div class="flex-item flex flex-column list-view-cotent">
      <Scrollbar class="list-view-main">
        <div class="flex flex-space-between">
          <div>
            <a-button type="primary" @click="onUploadChange">
              上传图片
            </a-button>
            <input
              ref="fileRef"
              type="file"
              accept="image/*"
              class="input-file"
              multiple="multiple"
              @change="handleFileChange"
            >
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
import fileUpload from '/@/utils/fileUpload'

export default defineComponent({
  components: { Scrollbar },
  props: {
    title: {
      type: String,
      default: '全部'
    }
  },
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<ProblemManage[]>([])
    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<ProblemManage>()
    // 文件
    const fileRef = ref<{ click: () => void } | null>(null)

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
    // 处理点击上传
    const onUploadChange = () => fileRef.value!.click()
    // 选中文件
    function handleFileChange(event: InputEvent) {
      const files = (event.target! as unknown as { files: File[] }).files
      if (!files.length) return
      // 进行上传
      fileUpload(files)
    }

    return {
      fileRef,
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onNewDataItem,
      onUploadChange,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem,
      handleFileChange
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

.input-file {
  display: none;
}

@media screen and (max-width: 1230px) {
  .operation-content {
    display: none;
  }
}
</style>
