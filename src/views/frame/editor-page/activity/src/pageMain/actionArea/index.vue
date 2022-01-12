<template>
  <global-drawer v-model:value="visible" placement="right" class="action-area">
    <div class="action-area-header index-middle index-space-between">
      <div>{{ baseConfigs.label[pointInfo.name || 'form'] }}</div>
      <div>
        <question-circle-outlined />
      </div>
    </div>
    <a-tabs v-if="isString(pointInfo.name)" size="small">
      <a-tab-pane key="1" tab="属性">
        <a-form class="action-area-main" label-align="left">
          <tool-attribute />
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="配置">
        <a-form class="action-area-main" label-align="left" :label-col="{ flex: '80px' }">
          <scrollbar height="calc(100vh - 150px)">
            <component :is="moduleAction[pointInfo.name]" />
          </scrollbar>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-else size="small">
      <a-tab-pane key="3" tab="配置">
        <a-form class="action-area-main" label-align="left">
          <scrollbar>
            <default-point />
          </scrollbar>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </global-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { moduleAction, baseConfigs } from '../../../tools/index';
import { pointStore } from '/@/store/modules/point';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import toolAttribute from './toolAttribute.vue';
import defaultPoint from './defaultPoint.vue';
import { isString } from '/@/utils/is';
import { Scrollbar } from '/@/components/Scrollbar';

const pointInfo = computed(() => pointStore.getPointInfo);
const pointidState = computed(() => pointStore.getPointidState);
// 折叠面板
const visible = ref<boolean>(true);

watch(
  () => pointidState.value,
  (val) => val && (visible.value = true)
);
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
          text-align: right;
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
