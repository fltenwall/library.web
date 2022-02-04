<template>
  <a-modal
    title="新增"
    :mask-closable="false"
    :confirm-loading="confirmLoading"
    @ok="onConfirm"
    @cancel="onCentel"
  >
    <a-form :layout="'vertical'">
      <a-form-item label="权限项名称" v-bind="validateInfos.name">
        <a-input v-model:value="dataItem.name" />
      </a-form-item>
      <a-form-item label="权限项" v-bind="validateInfos.authorities">
        <a-select
          v-model:value="dataItem.authorities"
          mode="multiple"
          show-search
          :option-filter-prop="'key'"
          :filter-option="handleFilterSelect"
        >
          <a-select-option v-for="item in authorityList" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { message, Form } from 'ant-design-vue';
import { formRules, DataItem } from './moduleAddModal';
import service, { ModuleManage } from '/@/api/system-manage/module-manage';
import serviceApi, { ApiManage } from '/@/api/system-manage/api-manage';
import PinYin from 'pinyin';

const useForm = Form.useForm;

const props = defineProps({ identifier: { type: String, default: '' } });

const emit = defineEmits(['on-success']);

const rules = reactive(formRules);

const dataItem = reactive<DataItem>({ name: '', authorities: [] });

const confirmLoading = ref<boolean>(false);

const authorityList = ref<ApiManage[]>([]);

const { resetFields, validate, validateInfos } = useForm(dataItem, rules);

async function fetchDataFromServer() {
  try {
    const { data } = await serviceApi.fecthListByAll();

    authorityList.value = data;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  }
}

// 添加新的数据
async function onConfirm() {
  if (!(await validItem())) return;

  const params: ModuleManage = {
    identifier: props.identifier,
    name: dataItem.name,
    authorities: dataItem.authorities
  };

  try {
    confirmLoading.value = true;
    await service.saveNewItem(params);
    resetFields();
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    confirmLoading.value = false;
    emit('on-success');
  }
}

const onCentel = () => resetFields();

// 拼音
const pinyin = (text: string): string => {
  return PinYin(text, { style: PinYin.STYLE_NORMAL }).flat().join('');
};

// 是否根据输入项进行筛选
function handleFilterSelect(inputValue: string, option: { key: string }) {
  const value = pinyin(inputValue);
  const target = pinyin(option.key);
  return new RegExp(value).test(target);
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

fetchDataFromServer();
</script>

<style lang="less" scoped></style>
