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
      <template v-if="column.dataIndex === 'state'">
        <div>{{ record.state ? '开启' : '关闭' }}</div>
      </template>

      <template v-else-if="column.dataIndex === 'createTime'">
        <div>{{ MixinUseMoment(record.createTime, 'YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import service from '/@/api/basis-manage/dictionary-manage';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';

const DATA_PAGE_NAME = 'basis-manage-dictionary-manage-data-page';

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
    title: '字典编号',
    dataIndex: 'id',
    ellipsis: true
  },
  {
    title: '字典名称',
    dataIndex: 'name',
    ellipsis: true
  },
  {
    title: '字典类型',
    dataIndex: 'type',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    ellipsis: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true
  }
];
</script>
