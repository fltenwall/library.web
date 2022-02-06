<template>
  <a-modal
    v-model:visible="modalState"
    width="500px"
    :confirm-loading="loading"
    :mask-closable="false"
    :title="title"
    @ok="handleNewData"
  >
    <a-form :label-col="{ flex: '90px' }">
      <a-form-item label="字典类型" v-bind="validateInfos.type">
        <input-wrap v-model:value="dataItem.type" readonly />
      </a-form-item>
      <a-form-item label="数据标签" v-bind="validateInfos.label">
        <input-wrap v-model:value="dataItem.label" />
      </a-form-item>
      <a-form-item label="数据键值" v-bind="validateInfos.value">
        <input-wrap v-model:value="dataItem.value" />
      </a-form-item>
      <a-form-item label="状态" v-bind="validateInfos.state">
        <select-wrap v-model:value="dataItem.state" :options="selectOption" />
      </a-form-item>
      <a-form-item label="描述" v-bind="validateInfos.description">
        <textarea-wrap v-model:value="dataItem.description" :maxlength="260" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import { assign } from 'lodash-es';
import { PropType, reactive, ref, watch, computed } from 'vue';
import { selectOption, dictDetailRules } from './data-page';
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail';
import { isDef } from '/@/utils/is';
import { message } from 'ant-design-vue';
import { resetDataItem } from '/@/hooks/web/useForm';
import { difference } from '/@/utils/difference';

const useForm = Form.useForm;

const props = defineProps({
  dictData: {
    type: Object as PropType<DictionaryDetail>,
    default: () => ({})
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'on-success']);

// 标题
const title = computed(() => (props.dictData.id ? '编辑' : '新增'));
// 数据集合
const dataItem = reactive<DictionaryDetail>({
  state: 1,
  label: '',
  value: '',
  description: ''
});
// 规则
const rules = reactive(dictDetailRules);
// 对话框状态
const modalState = ref<boolean>(false);
// 加载
const loading = ref<boolean>(false);

// 表单规则
const { validateInfos, resetFields, validate } = useForm(dataItem, rules);

watch(
  () => props.visible,
  (val) => {
    if (val) {
      assign(dataItem, props.dictData);
    } else {
      // 重置数据
      resetDataItem(dataItem), resetFields();
    }
    changeDataType();
    modalState.value = val;
  }
);

watch(
  () => modalState.value,
  (val) => emit('update:visible', val)
);

// 点击确认按钮
async function handleNewData() {
  try {
    if (!(await validItem())) return;
    loading.value = true;
    if (dataItem.id) await onSaveData(dataItem.id);
    else await onNewData();
    emit('on-success');
    emit('update:visible', false);
  } catch (err) {
    message.error(`${title.value}失败: ${(err as { msg: string }).msg}`);
  } finally {
    loading.value = false;
  }
}

// 保存数据
async function onSaveData(id: number) {
  const { data } = await service.updateItem(id, difference(dataItem, props.dictData));
  assign(dataItem, data);
  changeDataType();
}

// 新增数据
async function onNewData() {
  const { data } = await service.saveNewItem(dataItem);
  assign(dataItem, data);
  changeDataType();
}

// 数据类型改变
function changeDataType() {
  isDef(dataItem.state) && (dataItem.state = dataItem.state ? 1 : 0);
}

// 检测数据
async function validItem() {
  try {
    await validate();
    return true;
  } catch (err) {
    return false;
  }
}
</script>

<style lang="less" scoped></style>
