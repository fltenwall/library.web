<template>
  <global-data-page :mode="mode">
    <a-form :label-col="{ flex: '110px' }">
      <!-- 基本信息 -->
      <global-card title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl4 pr4">
            <a-form-item label="名称" v-bind="validateInfos.name">
              <input-wrap v-model:value="dataItem.name" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl4 pr4">
            <a-form-item label="状态" v-bind="validateInfos.state">
              <select-wrap v-model:value="dataItem.state" :options="stateSelectOption" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl4 pr4">
            <a-form-item label="模式" v-bind="validateInfos.mode">
              <select-wrap v-model:value="dataItem.mode" :options="modeSelectOption" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl4 pr4">
            <a-form-item label="页面布局" v-bind="validateInfos.layoutType">
              <select-wrap v-model:value="dataItem.layoutType" :options="layoutSelectOption" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="18" class="pl4 pr4">
            <a-form-item label="描述">
              <textarea-wrap
                v-model:value="dataItem.description"
                show-count
                :maxlength="260"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </global-card>
    </a-form>

    <!-- 修改信息 -->
    <operation-info-panel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button @click="onComposePage">排版</a-button>
      <a-button v-if="!readonly" @click="onRestPage">重置</a-button>
      <a-button v-if="readonly" type="primary" @click="onEditPage">编辑</a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage">保存</a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { dataPageMix } from '/@/lib/idata/data-page/';
import { formRules, stateSelectOption, modeSelectOption, layoutSelectOption } from './data-page';
import service, { ActivityManage } from '/@/api/page-manage/activity-page';
import { useGo } from '/@/hooks/web/usePage';
import { PageEnum } from '/@/enums/pageEnum';
import { assign } from 'lodash-es';

export default defineComponent({
  setup() {
    const dataItem = reactive<ActivityManage>({ state: 1, mode: 1 });
    const rules = reactive(formRules);
    const onServerMethods = { onNewData, onSaveData, onLoadDataById };
    const parameter = { rules, dataItem, onServerMethods };
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<ActivityManage>(parameter);
    const { mode, readonly } = toRefs(pageInfo);
    // 页面跳转
    const go = useGo();

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      assign(dataItem, data);
      changeDataType();
    }

    // 保存数据
    async function onSaveData(id: number, contrast: ActivityManage) {
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
    // 排版页面
    function onComposePage() {
      go({ name: PageEnum.EDITOR_ACTIVITY, params: { id: pageInfo.query.id! } });
    }

    return {
      mode,
      readonly,
      dataItem,
      loading,
      modeSelectOption,
      stateSelectOption,
      layoutSelectOption,
      validateInfos,
      onComposePage,
      ...onDataMethods
    };
  }
});
</script>

<style lang="less" scoped></style>
