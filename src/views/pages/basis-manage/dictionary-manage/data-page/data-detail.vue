<template>
  <global-card title="字典数据">
    <!-- 搜索数据 -->
    <a-form :label-col="{ flex: '100px' }">
      <div class="index-space-between">
        <form-item-wrap label="数据标签">
          <input-wrap v-model:value="queryData.label" :is-readonly="false" />
        </form-item-wrap>
        <div class="index-button-right mr-4">
          <a-button>查询</a-button>
          <a-button v-if="editMode" @click="onNewDataItem">新增</a-button>
        </div>
      </div>
    </a-form>

    <!-- 表格 -->
    <global-table :loading="loading" :columns="dataTypeColumn" :data-source="dataSource">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'state'">
          <a-tag v-if="record.state" color="success" class="mr-0">开启</a-tag>
          <a-tag v-else color="error">关闭</a-tag>
        </template>

        <template v-else-if="column.dataIndex === 'operation'">
          <div class="index-operation">
            <action-button @on-select="onEditDataItem(record)">编辑</action-button>
            <action-button value="delete" @on-select="onDeleteDataItem(record)">删除</action-button>
          </div>
        </template>
      </template>
    </global-table>

    <!-- 分页 -->
    <pagination-wrap
      v-model:current="current"
      class="index-right pr-4 pt-5"
      :total="totalElements"
      @change="onPageChange"
    />

    <!-- 对话框 -->
    <data-detail-modal v-model:visible="visible" :dict-data="dataItem" @on-success="fetchDataFromServer" />
  </global-card>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { PageMode } from '/@/utils/helper/breadcrumb';
import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';
import { usePagination } from '/@/hooks/web/usePagination';
import { dataTypeColumn } from './data-page';
import dataDetailModal from './data-detail-modal.vue';
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail';

const props = defineProps({
  dictType: {
    type: String,
    default: ''
  },
  mode: {
    // 出错 -1 查看 0 编辑 1 新增 2
    type: Number as PropType<PageMode>,
    default: undefined
  }
});

const editMode = computed(() => props.mode === PageMode.edit);
// 查询数据
const queryData = reactive({ type: props.dictType, label: '' });
// 加载
const loading = ref<boolean>(false);
// 总页数
const totalElements = ref<number>(0);
// 页面发生变换
const { current, getPagination } = usePagination();
// 页面发生变化
const onPageChange = () => fetchDataFromServer();
// 全部数据
const dataSource = ref<DictionaryDetail[]>([]);
// 是否显示对话框
const visible = ref<boolean>(false);
// 数据内容
let dataItem = ref({});
// 点击添加按钮
const onNewDataItem = () => {
  dataItem.value = { type: props.dictType };
  visible.value = true;
};
// 编辑数据
const onEditDataItem = (record: DictionaryDetail) => {
  dataItem.value = record;
  visible.value = true;
};
// 数据删除
async function onDeleteDataItem({ id }: Required<DictionaryDetail>) {
  await service.deleteItemById(id);

  fetchDataFromServer();
}
// 获取服务器数据
async function fetchDataFromServer() {
  try {
    loading.value = true;
    const query = { ...getPagination(), sort: '', ...queryData };
    const { data } = await service.fecthList(query);
    dataSource.value = data.content;
    totalElements.value = data.totalElements;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}

fetchDataFromServer();
</script>
