<template>
  <div class="panel-menu">
    <div class="panel-menu-item" :class="isLock && 'disabled'" @click="handleCopyPoint">复制</div>
    <div class="panel-menu-item" @click="handleLockPoint">{{ isLock ? '解锁' : '锁定' }}</div>
    <div class="panel-menu-item index-space-between" @click="handleDeletePoint">
      <div>删除</div>
      <div class="menuTips">Del</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { pointStore } from '/@/store/modules/activity';
import { handleStore } from '../utils/index';
import { isDef } from '/@/utils/is';

const pointInfo = computed(() => pointStore.getPointInfo);

const isLock = computed(() => pointInfo.value.sizeLock && pointInfo.value.positionLock);

const emits = defineEmits(['on-delete', 'on-copy']);

// 删除 point
function handleDeletePoint() {
  const id = pointInfo.value.id;

  isDef<string>(id) && handleStore('d', { id });

  emits('on-delete', unref(pointInfo).id);
}

// 锁定
function handleLockPoint() {
  const id = pointInfo.value.id;

  const value = !isLock.value;

  isDef<string>(id) && handleStore('u', { id, key: 'sizeLock', value });

  isDef<string>(id) && handleStore('u', { id, key: 'positionLock', value });
}

// 复制
function handleCopyPoint() {
  // 锁定不允许复制
  if (isLock.value) return;
  emits('on-copy', unref(pointInfo));
}
</script>

<style lang="less" scoped>
.panel-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  width: 150px;
  padding: 0 16px;
  background: #fff;
  border-radius: 4px;
  opacity: 0.94;

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

    &.disabled {
      color: rgba(0, 0, 0, 0.25) !important;
      cursor: not-allowed;
    }
  }

  .menuTips {
    font-size: 12px;
    color: #bfbfbf;
  }
}
</style>
