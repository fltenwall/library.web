<template>
  <div class="default-point-item">
    <div class="c333">宽度</div>
    <ui-input class="w-100" :value="canvasSize.width" readonly />
  </div>
  <div class="default-point-item">
    <div class="c333">高度</div>
    <ui-input class="w-100" :value="canvasSize.height" readonly />
  </div>
  <a-divider />
  <div class="default-point-item">
    <div class="c333">锁定高度</div>
    <lock
      :value="pageOptions.heigheLock"
      @change="(value: string) => handleUpdateData(value, 'heigheLock')"
    />
  </div>
  <a-divider />
  <div class="default-point-item">
    <div class="c333">背景颜色</div>
    <color-picker
      :value="pageOptions.backgroundColor"
      @change="handleUpdateData($event, 'backgroundColor')"
    />
  </div>
  <div class="default-point-item">
    <div class="c333">背景图片链接</div>
    <ui-input
      class="w-180"
      :value="pageOptions.backgroundImage"
      readonly
      allow-clear
      placeholder=""
      @on-change="(value: string) => handleUpdateData(value, 'backgroundImage')"
    />
  </div>
  <a-divider />
  <div class="default-point-item">
    <div class="c333">布局类型</div>
    <a-radio-group
      :value="pageOptions.layoutType"
      class="flex-end flex"
      @change="handleChange($event, 'layoutType')"
    >
      <a-radio-button :value="1">自由布局</a-radio-button>
      <a-radio-button :value="2">弹性布局</a-radio-button>
    </a-radio-group>
  </div>
  <a-divider />
  <div class="default-point-item">
    <div class="c333">内间距</div>
    <a-radio-group :value="pageOptions.margin" class="flex-end flex" @change="handleChange($event, 'margin')">
      <a-radio-button :value="0">无间距</a-radio-button>
      <a-radio-button :value="10">10px</a-radio-button>
      <a-radio-button :value="20">20px</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script setup lang="ts">
import type { ActivityManage } from '/@/api/page-manage/activity-page';
import { computed } from 'vue';
import uiInput from '/@/lib/UI/src/input/index';
import lock from './src/lock.vue';
import { pointStore } from '/@/store/modules/point';

// 数据
const pageOptions = computed(() => pointStore.getPageOptionsState);
// 画布大小
const canvasSize = computed(() => pointStore.getCanvasSizeState);

// 处理布局切换
function handleChange(e: Event, key: keyof ActivityManage) {
  const value = (e.target as unknown as { value: number }).value;

  handleUpdateData(value, key);
}

// 处理数据内容发生变化
function handleUpdateData(value: ActivityManage[keyof ActivityManage], key: keyof ActivityManage) {
  pointStore.commitUpdatePageOptionsState({ key, value });
}
</script>

<style lang="less" scoped>
.default-point-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + .default-point-item {
    margin-top: 10px;
  }
}
</style>
