<template>
  <page-layout
    title="操作日志"
    :search-options="searchOptions"
    :table-columns="tableColumns"
    :on-fetch-data="fetchDataFromServer"
  >
    <template #tableBodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'location'">
        <div class="location">
          <span v-if="record.ipRecord.nation">{{ record.ipRecord.nation }}</span>
          <span v-if="record.ipRecord.province">{{ record.ipRecord.province }}</span>
          <span v-if="record.ipRecord.city">{{ record.ipRecord.city }}</span>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'createTime'">
        {{ useFromatlll(record.createTime) }}
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="index-operation">
          <span @click="openDetailsModal(record)">详情</span>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'systemModule'"> {{ queryModule(record.path) }} </template>
    </template>
  </page-layout>

  <modal-details v-model:visible="dataDetails.visible" :data="dataDetails.dataItem" />
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import { reactive } from 'vue';
import service, { OperatorRecord } from '/@/api/record-manage/operator-record';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';
import { useFromatlll } from '/@/utils/dateFormat';
import modalDetails from './components/modal-details.vue';
import { queryModule } from '/@/utils/regExp';

// 从服务器取得数据 设置列表数据 禁止直接调用 刷新数据通过 onFetchData
async function fetchDataFromServer(query: PagerQueryData) {
  const { data } = await service.fecthList(query);

  return data;
}
type DataDetails = { visible: boolean; dataItem?: OperatorRecord };
// 对话框
const dataDetails = reactive<DataDetails>({ visible: false });
// 打开对话框
const openDetailsModal = (record: OperatorRecord) => {
  dataDetails.visible = true;
  dataDetails.dataItem = record;
};

const searchOptions: SearchOptions[] = [
  {
    key: 'account',
    component: 'inputSearch',
    label: '操作人员'
  },
  {
    key: 'ip',
    component: 'inputSearch',
    label: 'IP 地址'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '操作人员',
    dataIndex: 'account',
    ellipsis: true
  },
  {
    title: 'IP 地址',
    dataIndex: 'ip',
    ellipsis: true
  },
  {
    title: '国家 / 省份 / 城市',
    dataIndex: 'location',
    ellipsis: true
  },
  {
    title: '请求方式',
    dataIndex: 'method',
    ellipsis: true
  },
  {
    title: '系统模块',
    dataIndex: 'systemModule',
    ellipsis: true
  },
  {
    title: '操作状态',
    dataIndex: 'status',
    ellipsis: true
  },
  {
    title: '操作信息',
    dataIndex: 'description',
    ellipsis: true
  },
  {
    title: '操作日期',
    dataIndex: 'createTime',
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'operation',
    ellipsis: true,
    fixed: 'right'
  }
];
</script>

<style lang="less" scoped>
.location {
  span:not(:last-of-type) {
    &::after {
      content: ' / ';
    }
  }
}
</style>
