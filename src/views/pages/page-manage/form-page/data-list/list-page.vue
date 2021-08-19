<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view
      ref="listInstance"
      @onPageChange="onFetchData"
      @onRefresh="onFetchData"
      @onComposePage="onComposePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import service, { FormManage } from '/@/api/page-manage/form-page';
import { Instance } from '/@/lib/interface/ListPage';
import { listPageMix } from '/@/lib/idata/data-list/';
import searchPanle from './search-panle.vue';
import listView from './list-view.vue';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';

const DATA_PAGE_NAME = 'page-manage-form-page-data-page';

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<FormManage>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null
    });

    // 页面跳转
    const go = useGo();

    // 配置信息
    const options = {
      name: DATA_PAGE_NAME,

      fetchDataFromServer,

      deleteDataFromServer,

      instance
    };

    const { onFetchData, onSearchData, queryData } = listPageMix<FormManage>(options);

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

    // 排版页面
    function onComposePage(record: FormManage) {
      go({ name: PageEnum.EDITOR_FORM, params: { id: record.id! } });
    }

    return { onFetchData, onSearchData, onComposePage, ...toRefs(instance) };
  }
});
</script>

<style lang="less" scoped></style>
