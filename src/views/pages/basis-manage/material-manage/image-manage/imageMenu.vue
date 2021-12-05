<template>
  <div class="image-menu default-shadow">
    <div class="mb-4">目录</div>
    <div class="flex">
      <div class="menu-item" @click="handleNewItem">新建</div>
      <div class="w-3" />
      <div :class="[!selected.id && 'selected', 'menu-item']" @click="handleViewAllItem">全部</div>
    </div>

    <scrollbar class="image-menu-mian">
      <div
        v-for="item in dataSource"
        :key="item.id"
        :class="[selected.id === item.id && 'selected', 'image-menu-item']"
        @click="handleSelectItem(item)"
      >
        <div class="index-hidden-newline image-menu-item-title">{{ item.label }}</div>
        <div class="fs-3 mt-8 flex flex-space-between index-middle">
          <div>创建于：{{ useFromatlll(item.createTime) }}</div>
          <div class="index-operation item-operation">
            <span @click.stop="handleEditItem(item)">编辑</span>
            <span @click.stop="handleDeleleItem(item)">删除</span>
          </div>
        </div>
      </div>
    </scrollbar>

    <!-- 对话框 -->
    <a-modal
      v-model:visible="visible"
      width="350px"
      :confirm-loading="saveLoading"
      :title="dataItem.id ? '编辑' : '新建'"
      @ok="handleSaveItem"
    >
      <a-form :rules="rules">
        <a-form-item label="名称" v-bind="validateInfos.title">
          <a-input v-model:value="dataItem.label" />
        </a-form-item>
        <a-form-item label="键值" v-bind="validateInfos.value">
          <a-input v-model:value="dataItem.value" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';
import service, { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail';
import { message, Form } from 'ant-design-vue';
import { assign } from 'lodash';
import { isNumber } from '/@/utils/is';
import { useFromatlll } from '/@/utils/dateFormat';

const DICT_TYPE = 'image_manage';

const useForm = Form.useForm;
const emit = defineEmits(['on-select', 'on-data-source']);
// 选中的数据
const selected = reactive<DictionaryDetail>({});
// 数据源
const dataSource = ref<Required<DictionaryDetail>[]>([]);
// 加载
const loading = ref<boolean>(false);
// 保存加载
const saveLoading = ref<boolean>(false);
// 添加规则
const rules = reactive({
  title: [{ required: true, message: '不允许为空' }],
  value: [{ required: true, message: '不允许为空' }]
});
// 数据内容
const dataItem = reactive<DictionaryDetail>({ type: DICT_TYPE, state: 1 });
// 对话框是否显示
const visible = ref<boolean>(false);
// 获取表单规则
const { validate, validateInfos, resetFields } = useForm(dataItem, rules);
// 获取服务器数据
async function fetchDataFromServer() {
  try {
    const { data } = await service.fecthListByType(DICT_TYPE);
    dataSource.value = data;
    emit('on-data-source', data);
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}
// 新建
function handleNewItem() {
  resetFields();
  visible.value = true;
}
// 编辑
function handleEditItem(record: Required<DictionaryDetail>) {
  assign(dataItem, record);
  visible.value = true;
}
// 保存数据
async function handleSaveItem() {
  if (!(await validItem()) || saveLoading.value) return;
  try {
    saveLoading.value = true;
    if (isNumber(dataItem.id)) {
      await service.updateItem(dataItem.id, dataItem);
    } else {
      await service.saveNewItem(dataItem);
    }
    fetchDataFromServer();
    visible.value = false;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    saveLoading.value = false;
  }
}
// 删除
function handleDeleleItem(record: Required<DictionaryDetail>) {
  useDeleteModal(async () => {
    await service.deleteItemById(record.id);

    fetchDataFromServer();
  });
}
// 选中
function handleSelectItem(record: Required<DictionaryDetail>) {
  emit('on-select', record);
  assign(selected, record);
}
// 处理查看全部
function handleViewAllItem() {
  assign(selected, { id: '', title: '' });
  emit('on-select', { id: '', title: '' });
}
// 校验数据
async function validItem() {
  try {
    await validate();
  } catch {
    return false;
  }
  return true;
}

fetchDataFromServer();
</script>

<style lang="less" scoped>
@itemBorder: 1px solid #e5e6eb;

.image-menu {
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 16px;
  background: #fff;

  &-mian {
    flex: 1;
    height: 0;
  }

  &-item {
    padding: 10px;
    cursor: pointer;
    border: @itemBorder;

    &-title {
      color: #0960bd;
    }

    &:hover {
      background-color: #f7f8fa;

      .item-operation {
        opacity: 1;
      }
    }

    &:not(:last-of-type) {
      margin: 0 0 12px;
    }

    .item-operation {
      opacity: 0;
    }
  }
}

.menu-item {
  height: 32px;
  padding-left: 10px;
  margin: 0 0 16px 0;
  line-height: 32px;
  color: #0960bd;
  text-align: center;
  cursor: pointer;
  border: @itemBorder;
  flex: 1;

  &:hover {
    background-color: #f7f8fa;
  }
}

.selected {
  background-color: #f7f8fa;
}
</style>
