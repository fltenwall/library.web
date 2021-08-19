<template>
  <GlobalDataPage :mode="mode">
    <a-form :label-col="{ flex: '100px' }" :wrapper-col="{ flex: 'auto' }">
      <!-- 基本信息 -->
      <GlobalCard title="基本信息">
        <a-row>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="字典名称" v-bind="validateInfos.name">
              <InputWrap v-model:value="dataItem.name" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="字典类型" v-bind="validateInfos.type">
              <InputWrap v-model:value="dataItem.type" :readonly="mode === 1" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :lg="9" class="pl-4 pr-4">
            <a-form-item label="状态" v-bind="validateInfos.state">
              <SelectWrap v-model:value="dataItem.state" :options="selectOption" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :xs="24" :lg="18" class="pl-4 pr-4">
            <a-form-item label="描述">
              <TextareaWrap
                v-model:value="dataItem.description"
                show-count
                :maxlength="260"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </GlobalCard>
    </a-form>

    <!-- 字典数据 -->
    <data-detail v-if="dataItem.id" :mode="mode" :dict-type="dataItem.type" />

    <!-- 修改信息 -->
    <OperationInfoPanel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button v-if="!readonly" @click="onRestPage"> 重置 </a-button>
      <a-button v-if="readonly" type="primary" @click="onEditPage"> 编辑 </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage">
        保存
      </a-button>
    </template>
  </GlobalDataPage>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { dataPageMix } from '/@/lib/idata/data-page/';
import { formRules, selectOption } from './data-page';
import service, { DictionaryManage } from '/@/api/basis-manage/dictionary-manage';
import { assign } from 'lodash-es';
import dataDetail from './data-detail.vue';

export default defineComponent({
  components: { dataDetail },
  setup() {
    const dataItem = reactive<DictionaryManage>({ state: 1 });
    const rules = reactive(formRules);
    const onServerMethods = { onNewData, onSaveData, onLoadDataById };
    const parameter = { rules, dataItem, onServerMethods };
    const { pageInfo, onDataMethods, validateInfos, loading } =
      dataPageMix<DictionaryManage>(parameter);
    const { mode, readonly } = toRefs(pageInfo);

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      assign(dataItem, data);
      changeDataType();
    }

    // 保存数据
    async function onSaveData(id: number, contrast: DictionaryManage) {
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
      ...onDataMethods
    };
  }
});
</script>

<style lang="less" scoped></style>
