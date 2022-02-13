<template>
  <div v-for="(item, index) in widgets" :key="index" class="widget-row">
    <div class="widget-row-label index-hidden-newline">
      <span v-if="item.label">{{ item.label }}</span>
      <span v-else>-</span>
    </div>
    <a-divider type="vertical" />
    <div class="flex-item">{{ item.key }}</div>
    <icon icon="typcn:flash" class="pointer hover:text-blue-500" @click="handleOpenModal(index, item)" />
    <a-divider type="vertical" />
    <div class="widget-row-operation text-red-400" @click="handleDeleteItem(index)">删除</div>
  </div>
  <div class="flex justify-end pr-2">
    <div class="widget-row-operation text-blue-500" @click="handleOpenModal(-1)">新增</div>
  </div>

  <!-- 对话框 -->
  <a-modal v-model:visible="visible" title="新增" @cancel="resetFields" @ok="handleClickOk">
    <a-form class="m-auto" :label-col="{ flex: '118px' }" :wrapper-col="{ flex: '275px' }">
      <a-form-item label="组件类型" v-bind="validateInfos.type">
        <ui-select v-model:value="dataItem.type" :options="componentTypes" />
      </a-form-item>
      <a-form-item label="字段名" v-bind="validateInfos.key">
        <ui-input v-model:value="dataItem.key" placeholder="请输入用于后端解析的英文字段名" />
      </a-form-item>
      <a-form-item label="标签名称" v-bind="validateInfos.label">
        <ui-input v-model:value="dataItem.label" />
      </a-form-item>
      <a-form-item label="占位提示" v-bind="validateInfos.placeholder">
        <ui-input v-model:value="dataItem.placeholder" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { EditorForm } from '/@/lib/interface/EditorForm';
import { UiSelect } from '/@/lib/UI/';
import uiInput from '/@/lib/UI/src/input/index';
import { Form } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

interface Widget {
  type: string;

  key: string;

  label: string;

  placeholder: string;
}

const props = defineProps({
  value: {
    type: Array as PropType<Widget[]>,
    default: () => []
  },
  prop: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value']);

const instance = inject('editor-form', {}) as EditorForm;

const useForm = Form.useForm;

const rules = reactive({
  key: [{ required: true, message: '不允许为空' }]
});

const dataItem = ref<Widget>({ type: 'input', key: '', label: '', placeholder: '' });

const visible = ref(false);

const selected = ref<number>(-1);

const widgets = ref<Widget[]>([]);

const { resetFields, validate, validateInfos } = useForm(dataItem, rules);

const componentTypes = [{ value: 'input', label: '输入框' }];

let isValueUpdateFromInner = false;

watch(
  () => props.value,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      widgets.value = cloneDeep(props.value);
    }
  },
  { immediate: true }
);

// 打开对话框
function handleOpenModal(select: number, record: Partial<Widget> = {}) {
  if (select !== -1) {
    dataItem.value = cloneDeep(record as Widget);
  }
  selected.value = select;

  visible.value = true;
}

// 	输入框内容变化时的回调
function handlChange(value: Widget[]) {
  isValueUpdateFromInner = true;
  // 父组件更新
  emit('update:value', cloneDeep(value));
  // 传递改变数据
  props.prop && instance.changeTrigger?.(props.prop);
}

// 删除数据
function handleDeleteItem(index: number) {
  widgets.value.splice(index, 1);

  handlChange(widgets.value);
}

// 保存数据
async function handleClickOk() {
  // 验证数据
  if (!(await validItem())) return;

  const data = { ...dataItem.value };

  if (selected.value === -1) {
    // 新增
    widgets.value.push(data);
  } else {
    widgets.value[selected.value] = data;
    // 编辑
  }

  handlChange(widgets.value);

  resetFields();

  visible.value = false;
}

// 检查数据
async function validItem() {
  try {
    await validate();
  } catch (err) {
    return false;
  }
  return true;
}
</script>

<style lang="less" scoped>
.widget-row {
  display: flex;
  height: 28.85px;
  padding-right: 8px;
  padding-left: 8px;
  margin-bottom: 8px;
  border: 1px solid @border-color-base;
  align-items: center;

  &-label {
    width: 50px;
    text-align: center;
  }

  &-operation {
    padding: 1px 5px;
    cursor: pointer;
    border-radius: 2px;
    user-select: none;
    flex-shrink: 0;

    &:hover {
      background-color: #f2f3f5;
    }

    &:active {
      background-color: #e5e6eb;
    }
  }
}
</style>
