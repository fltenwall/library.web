<template>
  <TableList
    title="角色列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @onRefresh="onRefresh"
  >
    <template v-if="MixinShowByAuth('ROLE:CREATE')" #header-left>
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span v-show-by-auth="'MODULAR:GET'" @click="onViewDataItem(record)">查看</span>
        <span v-show-by-auth="['ROLE:UPDATE', 'MODULAR:GET']" @click="onEditDataItem(record)">编辑</span>
        <span v-show-by-auth="'ROLE:DELETE'" @click="onDeleteDataItem(record)">删除</span>
      </div>
    </template>
    <template #isDefault="{ record }">
      <div v-if="record.isDefault">
        是
      </div>
      <div v-else>
        否
      </div>
    </template>

    <template #updateTime="{ record }">
      {{ MixinUseMoment(record.updateTime, 'YYYY-MM-DD HH:mm:ss') }}
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { RoleManage } from '/@/api/system-manage/role-mange'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<RoleManage[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<RoleManage>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: RoleManage) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: RoleManage) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: RoleManage) => listPage.onDeleteDataItem(record)

    const pagination = usePagination()

    // 页面发生变化
    const onPageChange = () => emit('on-page-change')

    // 处理刷新
    const onRefresh = () => emit('on-refresh')

    return {
      loading,
      dataSource,
      ...pagination,
      totalElements,
      tableColumns,
      onRefresh,
      onPageChange,
      onNewDataItem,
      onViewDataItem,
      onEditDataItem,
      onDeleteDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: RoleManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped></style>
