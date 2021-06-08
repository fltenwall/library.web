<template>
  <a-modal
    v-model:visible="modalState"
    :closable="false"
    :width="400"
    :footer="null"
    :body-style="{ padding: '16px 20px 20px' }"
  >
    <div class="modal-header">
      {{ title }}
    </div>
    <a-form layout="vertical">
      <a-form-item>
        <a-input v-model:value="dataItem.name" placeholder="名称" />
      </a-form-item>
      <a-form-item>
        <MenuSelect v-model:value="dataItem.link" placeholder="链接" />
      </a-form-item>
    </a-form>
    <div class="index-right modal-footer">
      <a-button class="mr-4" @click="onCancel">
        取消
      </a-button>
      <a-button type="primary" :disabled="!dataItem.name || !dataItem.link" :loading="loading" @click="onConfirm">
        完成
      </a-button>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { assign } from 'lodash-es'
import { defineComponent, reactive, ref, watch, PropType } from 'vue'
import service, { Quick } from '/@/api/quick'
import { resetDataItem } from '/@/hooks/web/useForm'
import MenuSelect from '/@/components/MenuSelect.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: { MenuSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    quickData: {
      type: Object as PropType<Quick>,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['update:visible', 'on-success'],
  setup(props, { emit }) {
    // 点击取消
    const onCancel = () => emit('update:visible', false)

    const dataItem = reactive<Quick>({})

    // 对话框状态
    const modalState = ref<boolean>(false)

    // 加载
    const loading = ref<boolean>(false)

    // 点击确认
    const onConfirm = async () => {
      try {
        loading.value = true
        if (dataItem.id) await onSaveData(dataItem.id, dataItem)
        else await onNewData()
        emit('on-success')
        emit('update:visible', false)
      } catch (err) {
        message.error(`更新失败: ${err.msg}`)
      } finally {
        loading.value = false
      }
    }

    // 保存数据
    async function onSaveData(id: number, contrast: Quick) {
      await service.updateItem(id, contrast)
    }

    // 新增数据
    async function onNewData() {
      await service.saveNewItem(dataItem)
    }

    watch(
      () => props.visible,
      (val) => {
        val ? assign(dataItem, props.quickData) : resetDataItem(dataItem)
        modalState.value = val
      }
    )

    return { loading, dataItem, modalState, onCancel, onConfirm }
  }
})
</script>

<style lang="less" scoped>
.modal-header {
  margin: 0 0 24px;
  font-size: 15px;
}
</style>
