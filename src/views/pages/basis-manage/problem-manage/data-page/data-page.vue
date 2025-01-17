<template>
  <global-data-page :mode="mode">
    <a-form :label-col="{ flex: '100px' }">
      <!-- 基本信息 -->
      <global-card title="基本信息">
        <a-form-item label="标题" v-bind="validateInfos.title">
          <input-wrap v-model:value="dataItem.title" />
        </a-form-item>
        <a-form-item label="状态" v-bind="validateInfos.state">
          <select-wrap v-model:value="dataItem.state" :options="selectOption" />
        </a-form-item>
        <a-form-item label="排序值" v-bind="validateInfos.sortValue">
          <input-number-wrap v-model:value="dataItem.sortValue" />
        </a-form-item>
        <a-form-item label="图标" v-bind="validateInfos.icon">
          <input-wrap v-model:value="dataItem.icon" />
        </a-form-item>
      </global-card>

      <global-card title="问题描述">
        <div class="editor-content">
          <preview-mode v-if="readonly" :value="dataItem.text" />
          <public-editor v-else v-model:value="dataItem.text" :configs="editorConfigs" />
        </div>
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
import service, { ProblemManage } from '/@/api/basis-manage/problem-manage';
import { formRules, editorConfigs, selectOption } from './data-page';
import { assign } from 'lodash-es';
import PreviewMode from '/@/components/PublicEditor/src/Preview';

export default defineComponent({
  components: { PreviewMode },
  setup() {
    const dataItem = reactive<ProblemManage>({ state: 1, sortValue: 0 });
    const rules = reactive(formRules);
    const onServerMethods = { onNewData, onSaveData, onLoadDataById };
    const parameter = { rules, dataItem, onServerMethods };
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<ProblemManage>(parameter);

    const { mode, readonly } = toRefs(pageInfo);

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      assign(dataItem, data);
      changeDataType();
    }

    // 保存数据
    async function onSaveData(id: number, contrast: ProblemManage) {
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
      validateInfos,
      editorConfigs,
      ...onDataMethods
    };
  }
});
</script>

<style lang="less" scoped>
.editor-content {
  height: 500px;
  margin: 16px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
