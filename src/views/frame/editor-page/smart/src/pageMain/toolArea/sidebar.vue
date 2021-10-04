<template>
  <div class="tool-area-switch">
    <a-tabs v-model:activeKey="activeKey" tab-position="left">
      <a-tab-pane v-for="menu in sidebarMenus" :key="menu">
        <template #tab>
          <div>
            <Icon :icon="pointConfigs.icon[menu]" size="20" />
          </div>
        </template>
      </a-tab-pane>

      <a-tab-pane>
        <template #tab>
          <div>
            <Icon icon="ant-design:user-outlined" size="20" />
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
    <div class="folding">
      <Icon icon="ant-design:double-left-outlined" size="20" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { viewList, pointConfigs } from '../../../tools/index';
import { pointStore } from '/@/store/modules/point';

export default defineComponent({
  setup() {
    const activeKey = computed({
      get: () => pointStore.getTabState,
      set: (state) => pointStore.commitTabState(state)
    });

    const sidebarMenus = computed(() => Object.keys(viewList));

    return { pointConfigs, sidebarMenus, activeKey };
  }
});
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
