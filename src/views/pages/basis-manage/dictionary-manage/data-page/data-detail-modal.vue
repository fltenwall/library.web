<template>
  <a-modal
    v-model:visible="modalState"
    width="500px"
    :confirm-loading="loading"
    :mask-closable="false"
    @ok="handleNewData"
  >
    <a-form :label-col="{ flex: '90px' }" :wrapper-col="{ flex: 'auto' }">
      <a-form-item label="字典类型" v-bind="validateInfos.type">
        <InputWrap v-model:value="dataItem.type" readonly />
      </a-form-item>
      <a-form-item label="数据标签" v-bind="validateInfos.label">
        <InputWrap v-model:value="dataItem.label" />
      </a-form-item>
      <a-form-item label="数据键值" v-bind="validateInfos.value">
        <InputWrap v-model:value="dataItem.value" />
      </a-form-item>
      <a-form-item label="状态" v-bind="validateInfos.state">
        <SelectWrap v-model:value="dataItem.state" :options="selectOption" />
      </a-form-item>
      <a-form-item label="描述" v-bind="validateInfos.description">
        <TextareaWrap v-model:value="dataItem.description" :maxlength="260" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { useForm } from '@ant-design-vue/use'
import { assign } from 'lodash-es'
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import { selectOption, dictDetailRules } from './data-page'
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail'
import { isDef } from '/@/utils/is'
import { message } from 'ant-design-vue'
import { resetDataItem } from '/@/hooks/web/useForm'

export default defineComponent({
  props: {
    dictData: {
      type: Object as PropType<DictionaryDetail>,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'on-success'],
  setup(props, { emit }) {
    // 数据集合
    const dataItem = reactive<DictionaryDetail>({ state: 1, label: '', value: '', description: '' })
    // 规则
    const rules = reactive(dictDetailRules)
    // 对话框状态
    const modalState = ref<boolean>(false)
    // 加载
    const loading = ref<boolean>(false)

    // 表单规则
    const { validateInfos, resetFields, validate } = useForm(dataItem, rules)

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          assign(dataItem, props.dictData)
        } else {
          // 重置数据
          resetDataItem(dataItem), resetFields()
        }
        changeDataType()
        modalState.value = val
      }
    )

    watch(
      () => modalState.value,
      (val) => emit('update:visible', val)
    )

    // 点击确认按钮
    async function handleNewData() {
      try {
        if (!validItem()) return
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
    async function onSaveData(id: number, contrast: DictionaryDetail) {
      const { data } = await service.updateItem(id, contrast)
      assign(dataItem, data)
      changeDataType()
    }

    // 新增数据
    async function onNewData() {
      const { data } = await service.saveNewItem(dataItem)
      assign(dataItem, data)
      changeDataType()
    }

    // 数据类型改变
    function changeDataType() {
      isDef(dataItem.state) && (dataItem.state = dataItem.state ? 1 : 0)
    }

    // 检测数据
    async function validItem() {
      try {
        await validate()
        return true
      } catch (err) {
        return false
      }
    }

    return { loading, modalState, selectOption, dataItem, validateInfos, handleNewData }
  }
})
</script>

<style lang="less" scoped></style>
