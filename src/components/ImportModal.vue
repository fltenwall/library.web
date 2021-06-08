<template>
  <a-modal v-model:visible="visible" style="top: 50px;" :width="width" :mask-closable="false" @cancel="onCancel">
    <template #title>
      <slot name="header-title" />
    </template>

    <div :style="{ height: browserSize.height - 252 + 'px' }">
      <GlobalTable
        v-click-away="onClickTableAway"
        :columns="columns"
        :row-key="rowKey"
        :pagination="false"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :scroll="{ y: browserSize.height - 310 }"
      >
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data" />
        </template>
      </GlobalTable>
    </div>

    <template #footer>
      <div class="index-space-between index-middle">
        <div>
          已选择 <a class="fw-b">{{ selectedRowKeys?.length }}</a> 项
        </div>
        <div>
          <a-button @click="onCancel">
            取消
          </a-button>
          <a-button type="primary" :loading="loading" @click="onConfirm">
            创建
          </a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, ref, reactive, computed, watch, unref } from 'vue'
import { importProps, SelectedData } from '/@/lib/props/ImportModal'
import { browserClient } from '/@/utils/elelment'

export default defineComponent({
  props: importProps,
  emits: ['update:value', 'on-confirm', 'on-click-table-away'],
  setup(props, { emit }) {
    const { dataSource } = toRefs(props)
    // 视图大小
    const browserSize = ref<{ width?: number; height?: number }>({})

    // 对话框是否可见
    const visible = ref<boolean>(false)

    // 加载
    const loading = ref<boolean>(false)

    // 选中的数据
    const selectedData = reactive<SelectedData>({ selectedRows: [], selectedRowKeys: [] })

    // 点击 table 以外的地方
    const onClickTableAway = () => emit('on-click-table-away')

    const isValueUpdateFromInner = ref<boolean>(false)

    // 选择功能的配置
    const rowSelection = computed(() => {
      return {
        onChange: (selectedRowKeys: number[], selectedRows: unknown[]) => {
          selectedData.selectedRowKeys = selectedRowKeys
          selectedData.selectedRows = selectedRows
        },
        // 	指定选中项的 key 数组，需要和 onChange 进行配合
        selectedRowKeys: selectedData.selectedRowKeys,
        // 	指定选中项的 key 数组，需要和 onChange 进行配合
        selectedRows: selectedData.selectedRows
      }
    })

    onMounted(() => (browserSize.value = browserClient()))

    watch(
      () => props.value,
      (val) => {
        if (isValueUpdateFromInner.value) {
          isValueUpdateFromInner.value = false
        } else if (val) {
          // 打开对话框
          visible.value = true
          // 设置全选
          selectedData.selectedRowKeys = [...new Array(unref(dataSource).length).keys()]
          // 选中项目
          selectedData.selectedRows = unref(dataSource)
        } else {
          visible.value = false
        }
      }
    )

    // 点击遮罩层或右上角叉或取消按钮的回调
    function onCancel() {
      visible.value = false
      isValueUpdateFromInner.value = true
      emit('update:value', false)
    }

    // 点击确定回调
    function onConfirm() {
      loading.value = true
      emit('on-confirm', selectedData.selectedRows, () => {
        loading.value = false
      })
    }

    return {
      visible,
      loading,
      browserSize,
      rowSelection,
      onCancel,
      onConfirm,
      onClickTableAway,
      ...toRefs(selectedData)
    }
  }
})
</script>

<style lang="less" scoped>
.import-modal-header {
  padding: 0 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}
</style>
