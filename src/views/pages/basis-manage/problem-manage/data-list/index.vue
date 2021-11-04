<template>
  <page-layout
    :name="DATA_PAGE_NAME"
    :table-actions="actions"
    :table-columns="tableColumns"
    :search-options="searchOptions"
    :on-fetch-data="fetchDataFromServer"
    :on-delete-data="deleteDataFromServer"
  >
    <template #tableBodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'show'">
        <a-tag v-if="record.state" color="#108ee9"> 可 见 </a-tag>
        <a-tag v-else color="#f50"> 不可见 </a-tag>
      </template>

      <template v-else-if="column.dataIndex === 'icon'">
        <icon v-if="record.icon" :icon="record.icon" />
      </template>

      <template v-else-if="column.dataIndex === 'updateTime'">
        {{ MixinUseMoment(record.updateTime, 'YYYY-MM-DD HH:mm:ss') }}
      </template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import service from '/@/api/basis-manage/problem-manage';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';

const DATA_PAGE_NAME = 'basis-manage-problem-manage-data-page';

const actions = [
  { label: '新增', value: 'new' },
  { label: '查看', value: 'view' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'delete' }
];

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
    label: '字典名称'
  },
  {
    key: 'type',
    component: 'inputSearch',
    label: '字典类型'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'show',
    ellipsis: true
  },
  {
    title: '排序值',
    dataIndex: 'sortValue',
    ellipsis: true
  },
  {
    title: '图标',
    dataIndex: 'icon',
    ellipsis: true
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    ellipsis: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    ellipsis: true
  }
];
</script>
