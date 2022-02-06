<template>
  <a-dropdown placement="bottomCenter" :get-popup-container="(triggerNode: Node) => triggerNode.parentNode">
    <icon icon="akar-icons:more-horizontal-fill" class="image-more" />

    <template #overlay>
      <a-menu theme="dark" @click="handleSelectMenu">
        <a-menu-item key="image" class="fs3">从素材库选择</a-menu-item>
        <a-menu-item key="delete" class="fs3">删除</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
const emit = defineEmits(['select']);

function handleSelectMenu({ key }: { key: string }) {
  emit('select', key);
}
</script>

<style lang="less" scoped>
.image-more {
  position: absolute;
  right: 2px;
  bottom: 2px;
  padding: 0 3px;
  color: #fff;
  cursor: pointer;
  background-color: #8b8080;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
