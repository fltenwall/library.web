<template>
  <div class="panel-menu">
    <div class="panel-menu-item" @click="handleCopyPoint">复制</div>
    <div class="panel-menu-item" @click="handleLockPoint">{{ lock ? '解锁' : '锁定' }}</div>
    <div class="panel-menu-item index-space-between" @click="handleDeletePoint">
      <div>删除</div>
      <div class="menuTips">Del</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { pointStore } from '/@/store/modules/point';
import { handleStore } from '../utils/index';
import { isDef } from '/@/utils/is';

const pointInfo = computed(() => pointStore.getPointInfo);

const lock = computed(() => pointInfo.value.sizeLock && pointInfo.value.positionLock);

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

  const sizeLock = pointInfo.value.sizeLock;

  const positionLock = pointInfo.value.positionLock;

  isDef<string>(id) && handleStore('u', { id, key: 'sizeLock', value: !sizeLock });

  isDef<string>(id) && handleStore('u', { id, key: 'positionLock', value: !positionLock });
}

// 复制
function handleCopyPoint() {
  emits('on-copy', unref(pointInfo));
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

  .menuTips {
    font-size: 12px;
    color: #bfbfbf;
  }
}
</style>
