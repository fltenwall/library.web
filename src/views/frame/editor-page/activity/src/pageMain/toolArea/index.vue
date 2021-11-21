<template>
  <div class="tool-area reactive">
    <sidebar-area />
    <div class="tool-area-panel">
      <panel-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebarArea from './sidebar.vue';
import panelArea from './panel.vue';
</script>

<style lang="less" scoped>
.tool-area {
  z-index: 10;
  display: flex;
  height: 100%;

  &-panel {
    left: 64px;
    width: 240px;
    background: #fff;
    border-left: 1px solid #f0f0f0;
    box-shadow: 0 2px 8px 0 #dbdbdb99;
    box-sizing: content-box;
  }
}
</style>
