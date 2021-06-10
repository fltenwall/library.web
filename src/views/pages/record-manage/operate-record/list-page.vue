<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view ref="listInstance" @onPageChange="onFetchData" @onRefresh="onFetchData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import { message } from 'ant-design-vue'
import service, { OperatorRecord } from '/@/api/record-manage/operator-record'
import searchPanle from './search-panle.vue'
import listView from './list-view.vue'

const DATA_PAGE_NAME = 'book-manage-book-info-data-page'

export default defineComponent({
  components: { listView, searchPanle },
  setup() {
    // 实例
    const instance = reactive<Instance<OperatorRecord>>({
      // 搜索实例
      searchInstance: null,
      // 列表实例
      listInstance: null
    })

    // 配置信息
    const options = {
      fetchDataFromServer,

      deleteDataFromServer,

      instance,

      name: DATA_PAGE_NAME
    }

    const { onFetchData, onSearchData, queryData } = listPageMix<OperatorRecord>(options)

    // 从服务器取得数据 设置列表数据 禁止直接调用 刷新数据通过 onFetchData
    async function fetchDataFromServer() {
      const query = queryData()
      try {
        const { data } = await service.fecthList(query)
        instance.listInstance?.setDataSource(data.content, data.totalElements)
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`)
      }
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer() {
      onFetchData()
    }

    return {
      onFetchData,
      onSearchData,
      ...toRefs(instance)
    }
  }
})
</script>

<style lang="less" scoped></style>
