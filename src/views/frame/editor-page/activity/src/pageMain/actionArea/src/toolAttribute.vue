<template>
  <div class="action-row">
    <div>唯一标识</div>
    <ui-input v-model:value="dataItem.id" readonly prop="zIndex" type="number" class="w200" />
  </div>
  <a-divider />
  <div class="flex">
    <div class="flex-item mr3 index-middle">
      <div class="flex-shrink-0 w6">w</div>
      <ui-input
        v-model:value="dataItem.width"
        prop="width"
        type="number"
        :min="10"
        :readonly="dataItem.sizeLock"
      />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w6">h</div>
      <ui-input
        v-model:value="dataItem.height"
        prop="height"
        type="number"
        :min="10"
        :readonly="dataItem.sizeLock"
      />
    </div>
  </div>
  <div class="flex mt4">
    <div class="flex-item mr3 index-middle">
      <div class="flex-shrink-0 w6">x</div>
      <ui-input v-model:value="dataItem.x" prop="x" type="number" :readonly="dataItem.positionLock" />
    </div>
    <div class="flex-item index-middle">
      <div class="flex-shrink-0 w6">y</div>
      <ui-input v-model:value="dataItem.y" prop="y" type="number" :readonly="dataItem.positionLock" />
    </div>
  </div>
  <a-divider />
  <div class="action-row">
    <div>锁定比例</div>
    <lock v-model:value="dataItem.sizeLock" prop="sizeLock" />
  </div>
  <div class="action-row">
    <div>锁定位置</div>
    <lock v-model:value="dataItem.positionLock" prop="positionLock" />
  </div>
  <a-divider />
  <div class="action-row">
    <div>层级</div>
    <ui-input v-model:value="dataItem.zIndex" class="w100" prop="zIndex" type="number" />
  </div>
</template>

<script setup lang="ts">
import { templateInit } from '../../../../tools/utils';
import uiInput from '/@/lib/UI/src/input/index';
import lock from './lock.vue';

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
</style>
