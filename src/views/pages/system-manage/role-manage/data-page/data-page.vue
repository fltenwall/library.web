<template>
  <global-data-page :mode="mode">
    <a-form :label-col="{ flex: '110px' }" :wrapper-col="{ flex: 'auto' }">
      <!-- 基本信息 -->
      <div class="flex">
        <tree-menu v-model:value="dataItem.modularIds" class="tree-menu" :mode="mode" :readonly="readonly" />
        <global-card title="基本信息" class="flex-item">
          <a-row>
            <a-col :xs="24" :lg="9" class="pl4 pr4">
              <a-form-item label="角色名称" v-bind="validateInfos.name">
                <input-wrap v-model:value="dataItem.name" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :lg="9" class="pl4 pr4">
              <a-form-item label="是否默认角色" v-bind="validateInfos.isDefault">
                <select-wrap v-model:value="dataItem.isDefault" :options="selectOption" />
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
      </div>
    </a-form>

    <!-- 修改信息 -->
    <operation-info-panel v-if="dataItem.id" :data="dataItem" />

    <!-- 操作 -->
    <template #footer-block>
      <a-button v-if="!readonly" @click="onRestPage"> 重置 </a-button>
      <a-button v-if="readonly" v-show-by-auth="'ROLE:UPDATE'" type="primary" @click="onEditPage">
        编辑
      </a-button>
      <a-button v-if="!readonly" type="primary" :loading="loading" @click="onSavePage"> 保存 </a-button>
    </template>
  </global-data-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { dataPageMix } from '/@/lib/idata/data-page/';
import { formRules } from './data-page';
import { assign } from 'lodash-es';
import service, { RoleManage } from '/@/api/system-manage/role-mange';
import treeMenu from './components/tree-menu.vue';

export default defineComponent({
  components: { treeMenu },
  setup() {
    const dataItem = reactive<RoleManage>({ isDefault: 0 });
    const rules = reactive(formRules);
    const onServerMethods = { onNewData, onSaveData, onLoadDataById };
    const parameter = { rules, dataItem, onServerMethods };
    const { pageInfo, onDataMethods, validateInfos, loading } = dataPageMix<RoleManage>(parameter);
    const { mode, readonly } = toRefs(pageInfo);

    const selectOption = [
      { value: 1, label: '是' },
      { value: 0, label: '否' }
    ];

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      assign(dataItem, data);
      changeDataType();
    }

    // 保存数据
    async function onSaveData(id: number, contrast: RoleManage) {
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
      dataItem.isDefault = dataItem.isDefault ? 1 : 0;
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

<style lang="less" scoped>
.tree-menu {
  width: 280px;
  margin: 0 0 16px 16px;
}
</style>
