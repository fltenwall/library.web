<template>
  <div>
    <search-layout :options="searchOptions" @on-instance="initSearchInstance" @on-search="onClickSearch" />
    <table-layout
      :title="title"
      :loading="loading"
      :columns="tableColumns"
      :actions="tableActions"
      @on-action="onClickAction"
      @on-refresh="onSearchData"
      @on-instance="initTableInstance"
      @on-page-change="onSearchData"
    >
      <template #bodyCell="data">
        <slot name="tableBodyCell" v-bind="data" />
      </template>
    </table-layout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import propsOptions from './props';
import { useProvide } from './useDepend';
import { useGo } from '/@/hooks/web/usePage';
import TableLayout from './TableLayout/index.vue';
import SearchLayout from './SearchLayout/index.vue';
import { PageMode } from '/@/utils/helper/breadcrumb';
import { Instance as SearchInstance } from './SearchLayout/interface';
import { Instance as TableInstance } from './TableLayout/interface';
import { message } from 'ant-design-vue';

const go = useGo();

const emit = defineEmits(['on-action']);
// 查询数据
let getSearchData: SearchInstance['getSearchData'];
// 设置数据方法
let setDataSource: TableInstance['setDataSource'];
// 设置分页页码
let setPagination: TableInstance['setPagination'];
// 获取页码
let getPagination: TableInstance['getPagination'];

const props = defineProps(propsOptions);

const loading = ref<boolean>(false);

// 搜索数据
async function onSearchData() {
  try {
    const query = { ...getSearchData(), ...getPagination() };

    loading.value = true;

    const data = await props.onFetchData?.(query);

    loading.value = false;

    setDataSource(data?.content, data?.totalElements);
  } catch (err) {
    message.error((err as { msg: string }).msg);
  }
}
// 点击搜索
function onClickSearch() {
  // 初始化页码
  setPagination();
  // 搜索数据
  onSearchData();
}
// 初始化搜索数据的实列
function initSearchInstance(instance: SearchInstance) {
  getSearchData = instance.getSearchData;
}
// 初始化表格数据的实列
function initTableInstance(instance: TableInstance) {
  setDataSource = instance.setDataSource;

  setPagination = instance.setPagination;

  getPagination = instance.getPagination;
}
// 点击活动页面
function onClickAction(key: 'view' | 'edit' | 'delete' | 'new', record: { id: number }) {
  const actionMap = {
    new: () => {
      go({ name: props.name, query: { mode: PageMode[PageMode.new] } });
    },
    view: () => {
      go({ name: props.name, query: { mode: PageMode[PageMode.view], id: record.id } });
    },
    edit: () => {
      go({ name: props.name, query: { mode: PageMode[PageMode.edit], id: record.id } });
    },
    delete: async () => {
      try {
        loading.value = true;
        await props.onDeleteData?.(record.id);
        onSearchData();
      } catch (err) {
        message.error((err as { msg: string }).msg);
        loading.value = false;
      }
    }
  };

  actionMap[key]?.();

  emit('on-action', key, record);
}

useProvide({ onSearchData });
// 初始化
onMounted(() => onSearchData());
</script>
