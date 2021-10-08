<template>
  <table-list
    title="表单列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @onRefresh="onRefresh"
  >
    <template #header-left>
      <a-button type="primary" @click="onNewDataItem"> 新增 </a-button>
    </template>

    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span @click="onComposePage(record)">排版</span>
        <span @click="onEditDataItem(record)">编辑</span>
        <span @click="onDeleteDataItem(record)">删除</span>
      </div>
    </template>

    <template #updateTime="{ record }">
      {{ MixinUseMoment(record.updateTime, 'YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #footer-right>
      <pagination-wrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </table-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { tableColumns } from './data-list';
import { FormManage } from '/@/api/page-manage/form-page';
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend';
import { usePagination } from '/@/hooks/web/usePagination';

export default defineComponent({
  emits: ['on-page-change', 'on-refresh', 'on-compose-page'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<FormManage[]>([]);

    // 总数据
    const totalElements = ref<number>(0);

    const listPage = injectListPage<FormManage>();

    // 数据加载
    const loading = listPage.loading;
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem();
    // 查看数据
    const onViewDataItem = (record: FormManage) => listPage.onViewDataItem(record);
    // 编辑数据
    const onEditDataItem = (record: FormManage) => listPage.onEditDataItem(record);
    // 删除数据
    const onDeleteDataItem = (record: FormManage) => listPage.onDeleteDataItem(record);
    // 排版页面
    const onComposePage = (record: FormManage) => emit('on-compose-page', record);

    const pagination = usePagination();

    // 页面发生变化
    const onPageChange = () => emit('on-page-change');

    // 处理刷新
    const onRefresh = () => emit('on-refresh');

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onNewDataItem,
      onComposePage,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem
    };
  },
  methods: {
    // 设置数据源
    setDataSource(data: FormManage[], total: number) {
      this.dataSource = data;
      this.totalElements = total;
    }
  }
});
</script>

<style lang="less" scoped></style>
