<template>
  <TableList
    title="登录日志列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @on-refresh="onRefresh"
  >
    <template #status="{ record }">
      {{ record.status }}
    </template>
    <template #createTime="{ record }">
      {{ useFromatlll(record.createTime) }}
    </template>

    <template #description="{ record }">
      <span v-if="record.description">{{ record.description }}</span>
      <span v-else>登录成功</span>
    </template>

    <template #location="{ record }">
      <div class="location">
        <span v-if="record.ipRecord.nation">{{ record.ipRecord.nation }}</span>
        <span v-if="record.ipRecord.province">{{ record.ipRecord.province }}</span>
        <span v-if="record.ipRecord.city">{{ record.ipRecord.city }}</span>
        <span v-if="record.ipRecord.district">{{ record.ipRecord.district }}</span>
      </div>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { tableColumns } from './data-list';
import { LoginRecord } from '/@/api/record-manage/login-record';
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend';
import { useFromatlll } from '/@/utils/dateFormat';
import { usePagination } from '/@/hooks/web/usePagination';

export default defineComponent({
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<LoginRecord[]>([]);

    // 总数据
    const totalElements = ref<number>(0);

    // 页面方法
    const listPage = injectListPage<LoginRecord>();

    // 数据加载
    const loading = listPage.loading;

    const { current, setPagination, getPagination } = usePagination();

    // 页面发生变化
    const onPageChange = () => emit('on-page-change');

    // 处理刷新
    const onRefresh = () => emit('on-refresh');

    return {
      loading,
      current,
      setPagination,
      getPagination,
      dataSource,
      totalElements,
      tableColumns,
      useFromatlll,
      onPageChange,
      onRefresh
    };
  },
  methods: {
    // 设置数据源
    setDataSource(data: LoginRecord[], total: number) {
      this.dataSource = data;
      this.totalElements = total;
    }
  }
});
</script>

<style lang="less" scoped>
.location {
  span:not(:last-of-type) {
    margin: 0 10px 0 0;
  }
}
</style>
