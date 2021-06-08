<template>
  <div ref="moduleVisitRef" class="mt-4 br-2 p-4 flex-item bg-white default-shadow">
    <div class="index-space-between index-middle mb-4">
      <div class="fw-b fs-4">
        模块权限设置
      </div>
      <a-button v-show-by-auth="'MODULAR_CREATE'" type="link" @click="onClickNewItem">
        新增
      </a-button>
    </div>
    <GlobalTable :scroll="scroll" :columns="tableColumns" :data-source="dataSource" :loading="loading">
      <template #authorities="{ record }">
        <a-tag v-for="key in record.authorities" :key="key">
          {{ authorityList[key] }}
        </a-tag>
      </template>
      <template #operation="{ record }">
        <a-button v-show-by-auth="'MODULAR_DELETE'" type="link" @click="onDeleteAuth(record)">
          删除
        </a-button>
      </template>
    </GlobalTable>
    <module-add-modal
      v-if="MixinShowByAuth('MODULAR_CREATE')"
      v-model:visible="visible"
      :authority-list="authorityList"
      :identifier="identifier"
      @on-success="onAddSuccess"
    />
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref, watch } from 'vue'
import { tableColumns } from './module-visit'
import service, { ModuleManage, Authority } from '/@/api/system-manage/module-manage'
import moduleAddModal from './module-add-modal.vue'
import { useDeleteModal } from '/@/hooks/web/useDeleteModal'
import { queryRoleAuthority } from '/@/enums/roleEnum'

export default defineComponent({
  components: { moduleAddModal },
  props: {
    identifier: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 对话框显示
    const visible = ref<boolean>(false)
    // 加载中
    const loading = ref<boolean>(true)

    const dataSource = ref<ModuleManage[]>()

    const moduleVisitRef = ref<HTMLElement | null>(null)

    const scroll = reactive<{ y?: number }>({})
    // 权限列表
    const authorityList = ref<Authority>({})

    // 新增数据
    const onClickNewItem = () => (visible.value = true)

    // 请求数据
    async function fetchDataFromServer() {
      try {
        loading.value = true
        const query = { identifier: props.identifier }
        const { data } = await service.fecthList(query)
        dataSource.value = dataParse(data.content)
      } catch (err) {
        message.error(`模块权限数据获取失败: ${err.msg}`)
      } finally {
        loading.value = false
      }
    }

    // 获取权限列表数据
    async function fetchAuthFromServer() {
      authorityList.value = await queryRoleAuthority()
    }

    // 数据解析
    function dataParse(data: ModuleManage[]) {
      return data.map((el) => {
        return {
          ...el,
          authorities: JSON.parse(el.authorities!)
        }
      })
    }

    // 删除权限
    function onDeleteAuth(record: ModuleManage) {
      useDeleteModal(async () => {
        try {
          await service.deleteItemById(record.id!)
          fetchDataFromServer()
        } catch (err) {
          message.error(`删除失败: ${err.msg}`)
        }
      })
    }

    // 处理添加数据成功
    function onAddSuccess() {
      visible.value = false
      fetchDataFromServer()
    }

    watch(
      () => props.identifier,
      () => {
        fetchDataFromServer()
      },
      { immediate: true }
    )

    setTimeout(() => {
      scroll.y = (moduleVisitRef.value?.offsetHeight as number) - 136
    }, 0)

    fetchAuthFromServer()

    return {
      scroll,
      loading,
      visible,
      dataSource,
      tableColumns,
      authorityList,
      onDeleteAuth,
      onClickNewItem,
      onAddSuccess,
      moduleVisitRef
    }
  }
})
</script>

<style lang="less" scoped></style>
