<template>
  <a-form :label-col="{ flex: '100px' }">
    <a-row type="flex" justify="end">
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="操作人员">
          <InputSearch v-model:value="queryData.userName" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="主机">
          <InputSearch v-model:value="queryData.ip" />
        </a-form-item>
      </a-col>
      <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col">
        <a-form-item label="请求方式">
          <a-select v-model:value="queryData.method">
            <a-select-option value="">
              全部
            </a-select-option>
            <a-select-option v-for="value in method" :key="value" :value="value">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <!-- <a-col v-show="isOpen" :xs="24" :lg="8" class="index-table-search-col" />  -->
      <a-col :xs="24" :lg="8" class="index-table-search-col">
        <div class="index-button-right">
          <a-button type="primary" @click="onSearchData">
            查询
          </a-button>
          <a-button @click="onResetData">
            重置
          </a-button>
          <DownOutButton :is-open="isOpen" @click="onOpen" />
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { PagerQueryData } from '/@/lib/http/axios/types'
import { useSearch, SearchInstance } from '/@/lib/idata/data-list/methods/useSearch'

export default defineComponent({
  emits: ['onSearch'],
  setup(_props, { emit }): SearchInstance {
    // 搜索是否展开
    const isOpen = ref<boolean>(false)
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

    const { onResetData, onOpen } = useSearch(queryData, isOpen)

    return {
      isOpen,
      queryData,
      onOpen,
      onResetData,
      onSearchData,
      getCurQueryData
    }
  },
  data() {
    return {
      method: ['GET', 'POST', 'PUT', 'DELETE']
    }
  }
})
</script>

<style lang="less" scoped></style>
