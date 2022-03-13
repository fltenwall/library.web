<template>
  <page-layout
    title="访问日志"
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
          <span v-if="record.ipRecord.district">{{ record.ipRecord.district }}</span>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'createTime'">
        {{ useFromatlll(record.createTime) }}
      </template>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import service from '/@/api/record-manage/access-record';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { PagerQueryData } from '/@/lib/http/axios/types';
import { useFromatlll } from '/@/utils/dateFormat';

// 从服务器取得数据 设置列表数据 禁止直接调用 刷新数据通过 onFetchData
async function fetchDataFromServer(query: PagerQueryData) {
  const { data } = await service.fecthList(query);

  return data;
}

const searchOptions: SearchOptions[] = [
  {
    key: 'ip',
    component: 'inputSearch',
    label: 'IP 地址'
  },
  {
    key: 'province',
    component: 'inputSearch',
    label: '省份'
  },
  {
    key: 'city',
    component: 'inputSearch',
    label: '城市'
  }
];

const tableColumns: TableColumn[] = [
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
    title: '浏览器',
    dataIndex: 'browser',
    ellipsis: true
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    ellipsis: true
  },
  {
    title: '访问日期',
    dataIndex: 'createTime',
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
