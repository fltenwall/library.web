<template>
  <TableList
    title="用户列表"
    :loading="loading"
    :columns="tableColumns"
    :data-source="dataSource"
    @onRefresh="onRefresh"
  >
    <template #header-left>
      <a-button type="primary" @click="onNewDataItem">
        新增
      </a-button>
    </template>
    <template v-if="MixinShowByAuth('USER:CREATE')" #enabled="{ text }">
      <div class="index-center-middle">
        <div :class="[text ? 'use' : 'disable', 'circle', 'mr-2']" />
        <div>{{ text ? '使用中' : '禁用中' }}</div>
      </div>
    </template>
    <template #superAdmin="{ text }">
      {{ text ? '是' : '否' }}
    </template>
    <template #operation="{ record }">
      <div class="index-operation">
        <span @click="onViewDataItem(record)">查看</span>
        <span v-show-by-auth="'USER:UPDATE'" @click="onEditDataItem(record)">编辑</span>
        <span v-show-by-auth="'USER:DELETE'" @click="onDeleteDataItem(record)">删除</span>
        <span v-show-by-auth="'USERPASSWORD:UPDATE'" @click="onEditPassword(record)">重置密码</span>
      </div>
    </template>

    <template #footer-right>
      <PaginationWrap v-model:current="current" :total="totalElements" @change="onPageChange" />
    </template>
  </TableList>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableColumns } from './data-list'
import { UserManage } from '/@/api/system-manage/user-manage'
import { injectListPage } from '/@/lib/idata/data-list/methods/useDepend'
import { usePagination } from '/@/hooks/web/usePagination'

export default defineComponent({
  emits: ['on-page-change', 'on-refresh', 'on-reset-password'],
  setup(_props, { emit }) {
    // 数据源
    const dataSource = ref<UserManage[]>([])

    // 总数据
    const totalElements = ref<number>(0)

    const listPage = injectListPage<UserManage>()

    // 数据加载
    const loading = listPage.loading
    // 添加新的数据
    const onNewDataItem = () => listPage.onNewDataItem()
    // 查看数据
    const onViewDataItem = (record: UserManage) => listPage.onViewDataItem(record)
    // 编辑数据
    const onEditDataItem = (record: UserManage) => listPage.onEditDataItem(record)
    // 删除数据
    const onDeleteDataItem = (record: UserManage) => listPage.onDeleteDataItem(record)
    // 密码重置
    const onEditPassword = (record: UserManage) => emit('on-reset-password', record)

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
      onEditPassword,
      onDeleteDataItem
    }
  },
  methods: {
    // 设置数据源
    setDataSource(data: UserManage[], total: number) {
      this.dataSource = data
      this.totalElements = total
    }
  }
})
</script>

<style lang="less" scoped>
.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  &.disable {
    background: #ff7875;
  }

  &.use {
    background: #7cb305;
  }
}
</style>
