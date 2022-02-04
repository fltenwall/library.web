<template>
  <global-drawer v-model:value="visible" placement="right" class="action-area" :width="310">
    <div class="action-area-header index-middle index-space-between">
      <div>{{ labelShowParse(pointName) }}</div>
      <div>
        <question-circle-outlined />
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey" size="small">
      <a-tab-pane v-for="item in modules" :key="item.name" :tab="labelShowParse(pointName, item.name)">
        <a-form class="action-area-main" label-align="left" :label-col="{ flex: '80px' }">
          <scrollbar height="calc(100vh - 150px)">
            <component :is="item.template" />
          </scrollbar>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </global-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { moduleAction, baseConfigs, moduleActionExtend as moduleExtend } from '../../../tools/index';
import { pointStore } from '/@/store/modules/point';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import toolAttribute from './src/toolAttribute.vue';
import defaultPoint from './src/defaultPoint.vue';
import { isObject, isString } from '/@/utils/is';
import { Scrollbar } from '/@/components/Scrollbar';

const pointName = computed(() => pointStore.getPointInfo.name);
const pointidState = computed(() => pointStore.getPointidState);

const activeKey = ref<string>('attr');

const modules = computed(() => {
  if (isString(pointName.value)) {
    // 属性
    const attr = { template: toolAttribute, name: 'attr' };
    // 配置
    const config = { template: moduleAction[pointName.value], name: 'config' };

    return [attr, config, ...(moduleExtend?.[pointName.value] || [])];
  }

  return [{ template: defaultPoint, name: 'attr' }];
});
// 折叠面板
const visible = ref<boolean>(true);

watch(
  () => pointidState.value,
  (val) => val && (visible.value = true)
);

function labelShowParse(name = 'form', key = 'template') {
  if (baseConfigs.label[key]) {
    // 存在内容名称无需查找
    return baseConfigs.label[key];
  }

  const result = baseConfigs.label[name];

  return isObject(result) ? result[key] : result;
}
</script>

<style lang="less" scoped>
.action-area {
  &-header {
    padding: 10px 16px 0;
    font-family: Microsoft JhengHei;
    font-size: 16px;
    font-weight: 700;
    color: #292b33;
  }

  &-main {
    padding: 0 16px;
    font-size: 12px;
  }

  ::v-deep(.ant-row) {
    margin-bottom: 16px;

    .ant-col {
      &.ant-form-item-control-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;

        .select-wrap {
          min-width: 100%;
        }
      }

      .ant-form-item-control {
        width: 100%;

        &-input-content {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }

  ::v-deep(.ant-input-affix-wrapper) {
    height: 28.85px;
  }

  ::v-deep(.ant-input) {
    height: 28.85px;
    font-size: 12px;
  }

  ::v-deep(label) {
    font-size: 12px;
  }

  ::v-deep(.ant-tabs) {
    .ant-tabs-nav-wrap {
      padding: 0 16px;
    }

    .ant-tabs-tab {
      padding: 8px 0;
    }
  }
}
</style>
