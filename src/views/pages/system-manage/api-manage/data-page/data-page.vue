<template>
  <global-data-page :mode="mode">
    <a-form :label-col="{ flex: '110px' }">
      <!-- 基本信息 -->
      <global-card title="基本信息">
        <a-form-item label="接口名称" v-bind="validateInfos.name">
          <input-wrap v-model:value="dataItem.name" />
        </a-form-item>
        <a-form-item label="接口路径" v-bind="validateInfos.path">
          <input-wrap v-model:value="dataItem.path" />
        </a-form-item>
        <a-form-item label="接口状态" v-bind="validateInfos.state">
          <select-wrap v-model:value="dataItem.state" :options="selectOption" />
        </a-form-item>
        <a-form-item label="请求方法" v-bind="validateInfos.method">
          <select-wrap v-model:value="dataItem.method" :options="methodOption" />
        </a-form-item>
        <a-form-item label="获取所有" v-bind="validateInfos.isAllData">
          <select-wrap v-model:value="dataItem.isAllData" :options="isOption" />
        </a-form-item>
        <a-form-item label="接口标识" v-bind="validateInfos.identifier">
          <input-wrap v-model:value="dataItem.identifier" readonly />
        </a-form-item>
        <a-form-item label="描述">
          <textarea-wrap
            v-model:value="dataItem.description"
            show-count
            :maxlength="260"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </global-card>
    </a-form>

    <!-- 修改信息 -->
    <operation-info-panel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button v-if="!readonly" @click="onDataMethods.onRestPage"> 重置 </a-button>
      <a-button v-if="readonly" type="primary" @click="onDataMethods.onEditPage"> 编辑 </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onDataMethods.onSavePage">
        保存
      </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts" setup>
import { dataPageMix } from '/@/lib/idata/data-page/';
import { formRules, selectOption, methodOption, isOption } from './data-page';
import service, { ApiManage } from '/@/api/system-manage/api-manage';
import { assign } from 'lodash-es';

const dataItem = reactive<ApiManage>({ state: 1, method: 'GET', isAllData: 1 });
const rules = reactive(formRules);
const onServerMethods = { onNewData, onSaveData, onLoadDataById };
const parameter = { rules, dataItem, onServerMethods };
const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<ApiManage>(parameter);
const { mode, readonly } = toRefs(pageInfo);

// 通过ID加载数据
async function onLoadDataById(id: number) {
  const { data } = await service.getItemById(id);
  assign(dataItem, data);
}

// 保存数据
async function onSaveData(id: number, contrast: ApiManage) {
  const { data } = await service.updateItem(id, contrast);
  assign(dataItem, data);
}

// 新增数据
async function onNewData() {
  const { data } = await service.saveNewItem(dataItem);
  assign(dataItem, data);
}
</script>

<style lang="less" scoped></style>
