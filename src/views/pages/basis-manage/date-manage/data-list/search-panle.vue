<template>
  <a-form :label-col="{ flex: '100px' }">
    <a-row type="flex" justify="end">
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="日期名称">
          <InputSearch v-model:value="queryData.name" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col" />
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-button-right">
          <a-button type="primary" @click="onSearchData">
            查询
          </a-button>
          <a-button @click="onResetData">
            重置
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { PagerQueryData } from '/@/lib/http/axios/types'
import { useSearch, SearchInstance } from '/@/lib/idata/data-list/methods/useSearch'

export default defineComponent({
  emits: ['onSearch'],
  setup(_props, { emit }): SearchInstance {
    // 数据搜索
    const queryData = reactive<PagerQueryData>({
      size: 10,
      page: 0,
      sort: 'createTime,desc'
    })
    // 返回查询条件
    const getCurQueryData = (): PagerQueryData => queryData

    // 查询数据
    const onSearchData = () => emit('onSearch')

    const { onResetData } = useSearch(queryData)

    return {
      queryData,
      onResetData,
      onSearchData,
      getCurQueryData
    }
  }
})
</script>

<style lang="less" scoped></style>
