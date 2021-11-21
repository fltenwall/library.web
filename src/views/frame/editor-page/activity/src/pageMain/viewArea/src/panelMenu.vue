<template>
  <div class="panel-menu">
    <div class="panel-menu-item">复制</div>
    <div class="panel-menu-item" @click="handleDeletePoint">删除</div>
  </div>
</template>

<script setup lang="ts">
import { handleStore } from '../utils/index';

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['on-delete']);

// 删除 point
function handleDeletePoint() {
  handleStore('d', { id: props.id });

  emits('on-delete', props.id);
}
</script>

<style lang="less" scoped>
.panel-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  width: 150px;
  padding: 0 16px;
  background: #fff;
  border-radius: 4px;
  opacity: 0.94;
  box-shadow: 0 2px 8px #00000026;
  user-select: none;

  &-item {
    height: 40px;
    line-height: 40px;

    &:not(:last-of-type) {
      border-bottom: 1px solid #f1f2f7;
    }

    &:hover {
      color: #2c63ff;
      cursor: pointer;
    }
  }
}
</style>
