<template>
  <page-layout
    title="用户列表"
    :name="DATA_PAGE_NAME"
    :table-actions="actions"
    :table-columns="tableColumns"
    :search-options="searchOptions"
    :on-fetch-data="fetchDataFromServer"
    :on-delete-data="deleteDataFromServer"
  >
    <template #tableBodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'date'"> {{ record.startDate }} - {{ record.endDate }} </template>

      <template v-else-if="column.dataIndex === 'delay'">
        <div>{{ onDelayTime(record) }}</div>
      </template>

      <template v-else-if="column.dataIndex === 'state'">
        <div>{{ record.state ? '开启' : '关闭' }}</div>
      </template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import dayjs from 'dayjs';
import service, { DateManage } from '/@/api/basis-manage/date-manage';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';

const DATA_PAGE_NAME = 'basis-manage-date-manage-data-page';

const actions = [
  { label: '新增', value: 'new' },
  { label: '查看', value: 'view' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'delete' }
];

// 计算延迟时间
const onDelayTime = ({ endDate, delayValue, delayUnit }: Required<DateManage>) => {
  const unit = ['y', 'Q', 'M', 'w', 'd'][delayUnit! - 1] as string;
  return dayjs(endDate, 'YYYY年MM月DD日')
    .add(delayValue, unit as 'y')
    .format('YYYY年MM月DD日');
};

// 从服务器取得数据 设置列表数据 禁止直接调用 刷新数据通过 onFetchData
async function fetchDataFromServer(query: PagerQueryData) {
  const { data } = await service.fecthList(query);

  return data;
}

// 删除数据, 刷新数据
async function deleteDataFromServer(id: number) {
  await service.deleteItemById(id);
}

const searchOptions: SearchOptions[] = [
  {
    key: 'name',
    component: 'inputSearch',
    label: '日期名称'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '日期名称',
    dataIndex: 'name',
    ellipsis: true
  },
  {
    title: '日期范围',
    dataIndex: 'date',
    ellipsis: true
  },
  {
    title: '延迟时间',
    dataIndex: 'delay',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'description',
    ellipsis: true
  }
];
</script>
