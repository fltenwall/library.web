<template>
  <div class="tool-area reactive">
    <sidebar-area />

    <div ref="instance" class="tool-area-panel">
      <div :style="{ marginTop }" class="slider-block" />

      <!-- 组件库 -->
      <muster-area />
      <!-- 大纲书 -->
      <structure-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebarArea from './src/sidebar.vue';
import musterArea from './src/muster.vue';
import structureArea from './src/structure.vue';
import { pointStore } from '/@/store/modules/form';

const instance = ref<HTMLNULL>(null);

const activeKey = computed(() => pointStore.getTabState);

const activeMap = { muster: '0', structure: '0' };

const marginTop = ref<string>('0');

watch(
  () => activeKey.value,
  (value) => (marginTop.value = activeMap[value])
);

onMounted(() => {
  const clientHeight = instance.value?.clientHeight || 0;

  // 设置 组件库
  activeMap.muster = `-${clientHeight}px`;
});
</script>

<style lang="less" scoped>
.tool-area {
  z-index: 10;
  display: flex;
  height: 100%;

  &-panel {
    width: 260px;
    background: #fff;
    border-left: 1px solid #f0f0f0;
    box-shadow: 0 2px 8px 0 #dbdbdb99;
    box-sizing: content-box;
  }
}

.slider-block {
  transition: margin 0.3s ease-in-out;
}
</style>
