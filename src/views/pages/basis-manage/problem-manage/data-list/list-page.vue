<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view ref="listInstance" @onPageChange="onFetchData" @onRefresh="onFetchData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import service, { ProblemManage } from '/@/api/basis-manage/problem-manage';
import { Instance } from '/@/lib/interface/ListPage';
import { listPageMix } from '/@/lib/idata/data-list/';
import searchPanle from './search-panle.vue';
import listView from './list-view.vue';

const DATA_PAGE_NAME = 'basis-manage-problem-manage-data-page';

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<ProblemManage>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null
    });

    // 配置信息
    const options = {
      name: DATA_PAGE_NAME,

      fetchDataFromServer,

      deleteDataFromServer,

      instance
    };

    const { onFetchData, onSearchData, queryData } = listPageMix<ProblemManage>(options);

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = queryData();
      const { data } = await service.fecthList(query);
      instance.listInstance?.setDataSource(data.content, data.totalElements);
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemById(id);
      onFetchData();
    }

    return { onFetchData, onSearchData, ...toRefs(instance) };
  }
});
</script>

<style lang="less" scoped></style>
