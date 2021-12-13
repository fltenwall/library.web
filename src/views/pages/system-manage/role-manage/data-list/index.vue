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
      <template v-if="column.dataIndex === 'updateTime'">
        {{ useFromatlll(record.createTime) }}
      </template>

      <template v-else-if="column.dataIndex === 'isDefault'">
        {{ record.isDefault ? '是' : '否' }}
      </template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import service from '/@/api/system-manage/role-mange';
import { showByAuth } from '/@/hooks/web/useAuthorities';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';
import { useFromatlll } from '/@/utils/dateFormat';

const DATA_PAGE_NAME = 'system-manage-role-manage-data-page';

const actions = [
  showByAuth('ROLE:CREATE') && { label: '新增', value: 'new' },
  { label: '查看', value: 'view' },
  showByAuth(['ROLE:UPDATE', 'MODULAR:GET']) && { label: '编辑', value: 'edit' },
  showByAuth('ROLE:DELETE') && { label: '删除', value: 'delete' }
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
    label: '角色名称'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '默认角色',
    dataIndex: 'isDefault',
    ellipsis: true,
    width: 80
  },
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '角色描述',
    dataIndex: 'description'
  }
];
</script>
