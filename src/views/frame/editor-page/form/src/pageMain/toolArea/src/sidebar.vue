<template>
  <div class="tool-area-switch">
    <a-tabs v-model:activeKey="activeKey" tab-position="left" size="small" class="flex-item">
      <a-tab-pane key="structure">
        <template #tab>
          <a-tooltip placement="right">
            <template #title> 大纲树 </template>
            <icon icon="ant-design:partition-outlined" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>

      <a-tab-pane key="muster">
        <template #tab>
          <a-tooltip placement="right">
            <template #title> 组件库 </template>
            <icon icon="ant-design:appstore-outlined" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { pointStore } from '/@/store/modules/form';

const activeKey = computed({
  get: () => pointStore.getTabState,
  set: (state) => pointStore.commitTabState(state)
});
</script>

<style lang="less" scoped>
.tool-area-switch {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  background: #fff;

  ::v-deep(.ant-tabs-nav) {
    padding-top: 35px;
  }

  ::v-deep(.ant-tabs-tab) {
    padding: 8px 15px;
  }

  ::v-deep(.ant-tabs-content-holder) {
    border-width: 0;
  }
}

.folding {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
