<template>
  <div class="tool-area-switch">
    <a-tabs v-model:activeKey="activeKey" tab-position="left" size="small" class="flex-item">
      <a-tab-pane v-for="menu in sidebarMenus" :key="menu">
        <template #tab>
          <a-tooltip placement="right">
            <template #title>
              {{ labelParse(menu) }}
            </template>
            <icon :icon="baseConfigs.icon[menu]" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>

      <a-tab-pane key="personal">
        <template #tab>
          <a-tooltip placement="right">
            <template #title> 我的素材 </template>
            <icon icon="ant-design:user-outlined" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>

      <a-tab-pane key="structure">
        <template #tab>
          <a-tooltip placement="right">
            <template #title> 大纲树 </template>
            <icon icon="ant-design:partition-outlined" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { moduleMuster, baseConfigs } from '../../../../tools/index';
import { pointStore } from '/@/store/modules/activity';
import { isObject } from '/@/utils/is';

const activeKey = computed({
  get: () => pointStore.getTabState,
  set: (state) => pointStore.commitTabState(state)
});

const sidebarMenus = computed(() => Object.keys(moduleMuster));

function labelParse(name: string, key = 'template') {
  const result = baseConfigs.label[name];

  return isObject(result) ? result[key] : result;
}
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
