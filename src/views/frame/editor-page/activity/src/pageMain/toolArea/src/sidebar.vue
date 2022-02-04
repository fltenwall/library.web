<template>
  <div class="tool-area-switch">
    <a-tabs v-model:activeKey="activeKey" tab-position="left" size="small" class="flex-item">
      <a-tab-pane v-for="menu in sidebarMenus" :key="menu">
        <template #tab>
          <a-tooltip placement="right">
            <template #title>
              {{ labelShowParse(menu) }}
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
            <icon icon="ant-design:gold-outlined" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>
    </a-tabs>
    <div class="folding">
      <icon icon="ant-design:double-left-outlined" size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { moduleMuster, baseConfigs } from '../../../../tools/index';
import { pointStore } from '/@/store/modules/point';
import { isObject } from '/@/utils/is';

const activeKey = computed({
  get: () => pointStore.getTabState,
  set: (state) => pointStore.commitTabState(state)
});

const sidebarMenus = computed(() => Object.keys(moduleMuster));

function labelShowParse(name: string, key = 'template') {
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
  width: 64px;
  padding: 30px 0 0;
  background: #fff;

  ::v-deep(.ant-tabs-left-bar) {
    width: calc(100% - 2px);
    border-right-width: 0;

    .ant-tabs-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    }

    .ant-tabs-ink-bar {
      left: 0;
      width: 3px;
    }
  }
}

.folding {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
