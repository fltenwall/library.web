<template>
  <div class="default-point-item">
    <div>宽度</div>
    <ui-input class="w-100" :value="viewSize.width" readonly />
  </div>
  <div class="default-point-item">
    <div>高度</div>
    <ui-input class="w-100" :value="viewSize.height" readonly />
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
  <a-divider />
  <div class="default-point-item">
    <div class="c333">背景颜色</div>
    <color-picker
      :value="pageOptions.backgroundColor"
      @change="handleUpdateData($event, 'backgroundColor')"
    />
  </div>
</template>

<script setup lang="ts">
import type { ActivityManage } from '/@/api/page-manage/activity-page';
import { inject, computed } from 'vue';
import uiInput from '/@/lib/UI/src/input/index';
import { pointStore } from '/@/store/modules/point';

const { getViewSize } = inject('viewSize') as {
  getViewSize: () => { width: number; height: number };
};
// 视图区
const viewSize = computed(() => getViewSize());
// 数据
const pageOptions = computed(() => pointStore.getPageOptionsState);

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
