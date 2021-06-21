<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <GlobalCard title="图片管理" class="flex-item flex flex-column default-shadow h0">
      <div class="flex-item flex h0">
        <classify-panle class="folder-panle-wrap mr-4" @on-select="handleSelect" />
        <list-view
          ref="listInstance"
          class="flex-item"
          :title="selectData.title || '全部'"
          @onPageChange="onFetchData"
          @onRefresh="onFetchData"
        />
      </div>
    </GlobalCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage'
import searchPanle from './search-panle.vue'
import listView from './list-view.vue'
import classifyPanle from './classify-panle.vue'

const DATA_PAGE_NAME = 'basis-manage-problem-manage-data-page'

export default defineComponent({
  components: { listView, searchPanle, classifyPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<ImageManage>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null
    })

    // 配置信息
    const options = {
      name: DATA_PAGE_NAME,

      fetchDataFromServer,

      deleteDataFromServer,

      instance
    }

    // 选中数据
    const selectData = ref<ImageManage>({})

    const { onFetchData, onSearchData, queryData } = listPageMix<ImageManage>(options)

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = queryData()
      console.log(query)
      // const { data } = await service.fecthClassifyList(query)
      // instance.listInstance?.setDataSource(data.content, data.totalElements)
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemById(id)
      onFetchData()
    }

    // 处理选中数据
    function handleSelect(record: ImageManage) {
      selectData.value = record
    }

    return { selectData, onFetchData, onSearchData, ...toRefs(instance), handleSelect }
  }
})
</script>

<style lang="less" scoped>
.index-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.folder-panle-wrap {
  width: 30%;
  max-width: 400px;
  min-width: 300px;
}
</style>
