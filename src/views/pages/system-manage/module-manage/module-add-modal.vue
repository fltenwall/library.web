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
          <a-select-option v-for="(value, key) in authorityList" :key="value" :value="key">
            {{ value }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { message, Form } from 'ant-design-vue';
import { defineComponent, reactive, ref } from 'vue';
import { formRules, DataItem } from './module-add-modal';
import service, { ModuleManage } from '/@/api/system-manage/module-manage';
import PinYin from 'pinyin';

const useForm = Form.useForm;

export default defineComponent({
  props: {
    identifier: {
      type: String,
      default: ''
    },
    authorityList: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['on-success'],
  setup(props, { emit }) {
    const rules = reactive(formRules);

    const dataItem = reactive<DataItem>({ name: '', authorities: [] });

    const confirmLoading = ref<boolean>(false);

    const { resetFields, validate, validateInfos } = useForm(dataItem, rules);

    // 发送前权限数据转为字符串
    function sendBefore(auth: string[]) {
      return JSON.stringify(auth);
    }

    // 添加新的数据
    async function onConfirm() {
      if (!(await validItem())) return;

      const params: ModuleManage = {
        identifier: props.identifier,
        name: dataItem.name,
        authorities: sendBefore(dataItem.authorities!)
      };

      try {
        confirmLoading.value = true;
        await service.saveNewItem(params);
        resetFields();
      } catch (err) {
        message.error(`模块权限添加失败: ${err.msg}`);
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

    return {
      dataItem,
      validateInfos,
      onCentel,
      onConfirm,
      confirmLoading,
      handleFilterSelect
    };
  }
});
</script>

<style lang="less" scoped></style>
