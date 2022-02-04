<template>
  <global-data-page :mode="mode">
    <a-form :label-col="{ flex: '110px' }">
      <!-- 基本信息 -->
      <global-card title="基本信息">
        <a-form-item label="日期名称" v-bind="validateInfos.name">
          <input-wrap v-model:value="dataItem.name" />
        </a-form-item>
        <a-form-item label="状态" v-bind="validateInfos.state">
          <select-wrap v-model:value="dataItem.state" :options="selectOption" />
        </a-form-item>
        <a-form-item label="开始日期" v-bind="validateInfos.startDate">
          <date-picker-wrap v-model:value="dataItem.startDate" :end-date="dataItem.endDate" />
        </a-form-item>
        <a-form-item label="结束日期" v-bind="validateInfos.endDate">
          <date-picker-wrap v-model:value="dataItem.endDate" :start-date="dataItem.startDate" />
        </a-form-item>
        <a-form-item label="延迟日期" v-bind="validateInfos.delayValue">
          <input-number-wrap v-model:value="dataItem.delayValue" />
        </a-form-item>
        <a-form-item label="延迟日期单位" v-bind="validateInfos.delayUnit">
          <select-wrap v-model:value="dataItem.delayUnit" :options="selectUnitOption" />
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
      <a-button v-if="!readonly" @click="onRestPage"> 重置 </a-button>
      <a-button v-if="readonly" type="primary" @click="onEditPage"> 编辑 </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage"> 保存 </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { dataPageMix } from '/@/lib/idata/data-page/';
import { formRules, selectOption, selectUnitOption } from './data-page';
import service, { DateManage } from '/@/api/basis-manage/date-manage';
import { assign } from 'lodash-es';

export default defineComponent({
  setup() {
    const dataItem = reactive<DateManage>({ state: 1 });
    const rules = reactive(formRules);
    const onServerMethods = { onNewData, onSaveData, onLoadDataById };
    const parameter = { rules, dataItem, onServerMethods };
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<DateManage>(parameter);
    const { mode, readonly } = toRefs(pageInfo);

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      assign(dataItem, data);
      changeDataType();
    }

    // 保存数据
    async function onSaveData(id: number, contrast: DateManage) {
      const { data } = await service.updateItem(id, contrast);
      assign(dataItem, data);
      changeDataType();
    }

    // 新增数据
    async function onNewData() {
      const { data } = await service.saveNewItem(dataItem);
      assign(dataItem, data);
      changeDataType();
    }

    // 改变数据类型
    function changeDataType() {
      dataItem.state = dataItem.state ? 1 : 0;
    }

    return {
      mode,
      readonly,
      dataItem,
      loading,
      selectOption,
      selectUnitOption,
      validateInfos,
      ...onDataMethods
    };
  }
});
</script>

<style lang="less" scoped></style>
