<template>
  <page-layout
    title="活动列表"
    :name="DATA_PAGE_NAME"
    :table-actions="actions"
    :table-columns="tableColumns"
    :search-options="searchOptions"
    :on-fetch-data="fetchDataFromServer"
    :on-delete-data="deleteDataFromServer"
    @on-action="handleClickAction"
  >
    <template #tableBodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'updateTime'">{{ useFromatlll(record.createTime) }}</template>
      <template v-else-if="column.dataIndex === 'mode'">{{ modeMap.get(record.mode) }}</template>
      <template v-else-if="column.dataIndex === 'layoutType'">{{ layoutMap.get(record.mode) }}</template>
      <template v-else-if="column.dataIndex === 'state'">{{ stateMap.get(record.state) }}</template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import service, { ActivityManage } from '/@/api/page-manage/activity-page';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';
import { useFromatlll } from '/@/utils/dateFormat';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';

const DATA_PAGE_NAME = 'page-manage-activity-page-data-page';

const go = useGo();

const modeMap = new Map().set(1, '移动端').set(2, 'PC端');

const layoutMap = new Map().set(1, '自由布局').set(2, '弹性布局');

const stateMap = new Map().set(false, '关闭').set(true, '开启');

const actions = [
  { label: '新增', value: 'new' },
  { label: '查看', value: 'view' },
  { label: (record: Required<ActivityManage>) => stateMap.get(!record.state), value: 'state' },
  { label: '排版', value: 'compose' },
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

// 处理操作点击
function handleClickAction(key: string, record: Required<ActivityManage>) {
  if (key === 'compose') {
    go({ name: PageEnum.EDITOR_ACTIVITY, params: { id: record.id } });
  }
}

const searchOptions: SearchOptions[] = [
  {
    key: 'name',
    component: 'inputSearch',
    label: '名称'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true
  },
  {
    title: '模式',
    dataIndex: 'mode',
    ellipsis: true
  },
  {
    title: '页面布局',
    dataIndex: 'layoutType',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
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

<style lang="less" scoped>
.location {
  span:not(:last-of-type) {
    &::after {
      content: ' / ';
    }
  }
}
</style>
