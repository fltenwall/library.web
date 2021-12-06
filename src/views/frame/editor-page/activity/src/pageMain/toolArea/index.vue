<template>
  <div class="tool-area reactive">
    <sidebar-area />
    <div ref="instance" class="tool-area-panel">
      <div :style="{ marginTop }" class="slider-block" />
      <!-- 其他模块  -->
      <panel-area />
      <!-- 个人模块 -->
      <personal-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import sidebarArea from './src/sidebar.vue';
import panelArea from './src/panel.vue';
import personalArea from './src/personal.vue';
import { pointStore } from '/@/store/modules/point';

const instance = ref<HTMLNULL>(null);

const activeKey = computed(() => pointStore.getTabState);

const activeMap = { personal: '0' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const marginTop = computed(() => (activeMap as any)[activeKey.value] || '0');

onMounted(() => {
  // 设置间距位置
  activeMap.personal = `-${instance.value?.clientHeight}px`;
});
</script>

<style lang="less" scoped>
.tool-area {
  z-index: 10;
  display: flex;
  height: 100%;

  &-panel {
    width: 240px;
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
