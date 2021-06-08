<template>
  <div class="index-content">
    <div class="index-table-search index-card">
      <search-panle ref="searchInstance" @onSearch="onSearchData" />
    </div>
    <list-view
      ref="listInstance"
      @onPageChange="onFetchData"
      @onRefresh="onFetchData"
      @onResetPassword="openPasswordModal"
    />
    <password-modal v-model:value="modalData.visible" title="密码重置" @on-confirm="handleUpdatePassword" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import service, { UserManage } from '/@/api/system-manage/user-manage'
import { Instance } from '/@/lib/interface/ListPage'
import { listPageMix } from '/@/lib/idata/data-list/'
import passwordModal from '/@/components/passwordModal.vue'
import searchPanle from './search-panle.vue'
import listView from './list-view.vue'
import { message } from 'ant-design-vue'

const DATA_PAGE_NAME = 'system-manage-user-manage-data-page'

export default defineComponent({
  components: { listView, searchPanle, passwordModal },
  setup() {
    // 实例
    const instance = reactive<Instance<UserManage>>({
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

    const { onFetchData, onSearchData, queryData } = listPageMix<UserManage>(options)

    // 对话框
    const modalData = reactive({ visible: false, id: -1 })

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = queryData()
      const { data } = await service.fecthList(query)
      instance.listInstance?.setDataSource(data.content, data.totalElements)
    }

    // 删除数据, 刷新数据
    async function deleteDataFromServer(id: number) {
      await service.deleteItemById(id)
      onFetchData()
    }

    // 打开对话框
    function openPasswordModal({ id }: UserManage) {
      modalData.visible = true
      modalData.id = id!
    }

    // 密码修改
    async function handleUpdatePassword(password: string) {
      try {
        await service.updatePassword(modalData.id, password)
        message.success('重置成功')
        modalData.visible = false
      } catch (err) {
        message.error(`重置失败: ${err.msg}`)
      }
    }

    return {
      modalData,
      onFetchData,
      onSearchData,
      ...toRefs(instance),
      openPasswordModal,
      handleUpdatePassword
    }
  }
})
</script>

<style lang="less" scoped></style>
