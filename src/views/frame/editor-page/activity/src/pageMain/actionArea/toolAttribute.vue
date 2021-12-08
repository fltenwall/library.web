<template>
  <div class="action-row">
    <div>唯一标识</div>
    <ui-input v-model:value="dataItem.id" readonly prop="zIndex" type="number" class="w-200" />
  </div>
  <a-divider />
  <div class="action-row">
    <div>锁定位置</div>
    <div class="unlock-wrap">
      <icon icon="ant-design:unlock-outlined" size="14" />
    </div>
  </div>
  <div class="action-row">
    <div>锁定比例</div>
    <div class="unlock-wrap lock">
      <icon icon="ant-design:lock-outlined" size="14" />
    </div>
  </div>
  <a-divider />
  <div class="flex">
    <div class="flex-item mr-3 index-middle">
      <div class="flex-shrink-0 w-6">w</div>
      <ui-input v-model:value="dataItem.width" prop="width" type="number" :min="10" />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w-6">h</div>
      <ui-input v-model:value="dataItem.height" prop="height" type="number" :min="10" />
    </div>
  </div>
  <div class="flex mt-4">
    <div class="flex-item mr-3 index-middle">
      <div class="flex-shrink-0 w-6">x</div>
      <ui-input v-model:value="dataItem.x" prop="x" type="number" />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w-6">y</div>
      <ui-input v-model:value="dataItem.y" prop="y" type="number" />
    </div>
  </div>
  <a-divider />
  <div class="action-row">
    <div>层级</div>
    <ui-input v-model:value="dataItem.zIndex" class="w-100" prop="zIndex" type="number" />
  </div>
</template>

<script setup lang="ts">
import { templateInit } from '../../../tools/utils';
import uiInput from '/@/lib/UI/src/input/index';

const dataItem = templateInit();
</script>

<style lang="less" scoped>
.middle {
  display: flex;
  align-items: center;
}

.action-row {
  justify-content: space-between;
  .middle();

  & + .action-row {
    margin-top: 16px;
  }
}

.unlock-wrap {
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
  .middle();

  &.lock {
    background: #f2f2f2;
    border-radius: 3px;
  }
}
</style>
