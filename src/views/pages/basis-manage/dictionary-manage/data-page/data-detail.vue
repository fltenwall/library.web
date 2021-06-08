<template>
  <GlobalCard title="字典数据">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <a-row>
        <a-col :xs="24" :lg="8" class="pl-4 pr-4">
          <a-form-item label="数据标签">
            <InputWrap v-model:value="queryData.label" :is-readonly="false" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :lg="8" class="pl-4 pr-4" />
        <a-col :xs="24" :lg="8" class="pl-4 pr-4">
          <div class="index-button-right">
            <a-button :type="mode !== MixinPageMode.edit ? 'primary' : 'default'" @click="onSearchData">
              查询
            </a-button>
            <a-button v-if="mode === MixinPageMode.edit" type="primary" @click="onNewDataItem">
              新增
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <!-- 表格 -->
    <GlobalTable :loading="loading" :columns="dataTypeColumn" :data-source="dataSource">
      <template #state="{ record }">
        <div>{{ record.state ? '正常' : '停用' }}</div>
      </template>
      <template #operation="{ record }">
        <div class="index-operation">
          <span @click="onEditDataItem(record)">编辑</span>
          <span @click="onDeleteDataItem(record)">删除</span>
        </div>
      </template>
    </GlobalTable>

    <!-- 分页 -->
    <PaginationWrap
      v-model:current="current"
      class="index-right pr-4 pt-5"
      :total="totalElements"
      @change="onPageChange"
    />

    <!-- 对话框 -->
    <data-detail-modal
      v-model:visible="modal.visible"
      :dict-data="modal.data"
      :title="modal.title"
      @on-success="onModalSuccess"
    />
  </GlobalCard>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref } from 'vue'
import { dataTypeColumn } from './data-page'
import { PageMode } from '/@/utils/helper/breadcrumb'
import { usePagination } from '/@/hooks/web/usePagination'
import dataDetailModal from './data-detail-modal.vue'
import { message } from 'ant-design-vue'
import { useDeleteModal } from '/@/hooks/web/useDeleteModal'
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail'

interface Modal {
  // 标题
  title?: string
  // 隐藏/显示
  visible: boolean
  // 数据集
  data: DictionaryDetail
}

export default defineComponent({
  components: { dataDetailModal },
  props: {
    mode: {
      // 出错 -1 查看 0 编辑 1 新增 2
      type: Number as PropType<PageMode>,
      default: undefined
    },
    dictType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 查询数据
    const queryData = reactive({ type: props.dictType })

    // 对话框
    const modal = reactive<Modal>({ visible: false, data: {}, title: '' })

    // 全部数据
    const dataSource = ref<DictionaryDetail[]>([])

    // 加载
    const loading = ref<boolean>(false)

    // 总页数
    const totalElements = ref<number>(0)

    // 页面发生变换
    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => fetchDataFromServer()

    // 搜索数据
    const onSearchData = () => fetchDataFromServer()

    // 对话框数据修改成功
    const onModalSuccess = () => fetchDataFromServer()

    // 点击添加按钮
    const onNewDataItem = () => {
      modal.title = '添加字典数据'
      modal.visible = true
      modal.data = { type: props.dictType }
    }

    // 编辑数据
    const onEditDataItem = (record: DictionaryDetail) => {
      modal.title = '修改字典数据'
      modal.visible = true
      modal.data = record
    }

    // 数据删除
    async function onDeleteDataItem({ id }: DictionaryDetail) {
      useDeleteModal(async () => {
        await service.deleteItemById(id!)
        fetchDataFromServer()
      })
    }

    // 获取服务器数据
    async function fetchDataFromServer() {
      try {
        loading.value = true
        const { page, size } = pagination.getPagination()
        const { data } = await service.fecthList({ page, size, sort: '', ...queryData })
        dataSource.value = data.content
        totalElements.value = data.totalElements
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`)
      } finally {
        loading.value = false
      }
    }

    fetchDataFromServer()

    return {
      modal,
      loading,
      queryData,
      dataSource,
      totalElements,
      dataTypeColumn,
      ...pagination,
      onPageChange,
      onSearchData,
      onNewDataItem,
      onEditDataItem,
      onModalSuccess,
      onDeleteDataItem
    }
  }
})
</script>

<style lang="less" scoped></style>
