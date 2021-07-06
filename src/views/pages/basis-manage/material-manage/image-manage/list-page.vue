<template>
  <div class="index-content">
    <GlobalCard title="图片管理" class="flex-item flex flex-column default-shadow h0">
      <div class="flex-item flex h0">
        <classify-panle class="folder-panle-wrap mr-4" @on-select="handleSelect" />
        <list-view
          ref="listInstance"
          class="flex-item"
          :title="selectData.title || '全部'"
          :classify-id="selectData.id"
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
import service, { ImageManage, Classify } from '/@/api/basis-manage/material-manage/image-manage'
import listView from './list-view.vue'
import classifyPanle from './classify-panle.vue'

const DATA_PAGE_NAME = 'basis-manage-problem-manage-data-page'

export default defineComponent({
  components: { listView, classifyPanle },
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
    const selectData = ref<Classify>({})

    const { onFetchData, onSearchData, queryData } = listPageMix<ImageManage>(options)

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = { ...queryData(), classifyId: selectData.value.id }
      const { data } = await service.fecthImageList(query)
      instance.listInstance?.setDataSource(data.content, data.totalElements)
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemById(id)
      onFetchData()
    }

    // 处理选中数据
    function handleSelect(record: ImageManage) {
      selectData.value = record
      // 重新加载数据
      onFetchData()
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
  max-width: 350px;
  min-width: 300px;
}
</style>
