<template>
  <div class="tool-area-switch">
    <a-tabs tab-position="left" @change="handleTabChange">
      <a-tab-pane v-for="menu in sidebarMenus" :key="menu">
        <template #tab>
          <a-tooltip placement="right">
            <template #title>{{ pointConfigs.name[menu] }}</template>
            <Icon :icon="pointConfigs.icon[menu]" size="20" />
          </a-tooltip>
        </template>
      </a-tab-pane>

      <a-tab-pane>
        <template #tab>
          <a-tooltip placement="right">
            <template #title>我的</template>
            <Icon icon="ant-design:user-outlined" size="20" />
          </a-tooltip>
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
import { viewList, pointConfigs } from '../../components/tools/index';

export default defineComponent({
  setup() {
    // 处理标签切换
    function handleTabChange() {
      // s
    }

    const sidebarMenus = computed(() => Object.keys(viewList));

    return { pointConfigs, sidebarMenus, handleTabChange };
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
      padding: 8px 0;
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
