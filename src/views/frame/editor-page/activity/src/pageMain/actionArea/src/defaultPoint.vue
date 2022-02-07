<template>
  <div class="default-point-item">
    <div class="c333">宽度</div>
    <ui-input class="w100" :value="canvasSize.width" readonly />
  </div>
  <div class="default-point-item">
    <div class="c333">高度</div>
    <ui-input class="w100" :value="canvasSize.height" readonly />
  </div>
  <a-divider />
  <div class="default-point-item">
    <div class="c333">锁定高度</div>
    <lock :value="pageOptions.heigheLock" @change="handleUpdateData($event, 'heigheLock')" />
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
      class="w180"
      :value="pageOptions.backgroundImage"
      readonly
      allow-clear
      @change="(value: string) => handleUpdateData(value, 'backgroundImage')"
    />
  </div>
  <div class="mt2 flex justify-end">
    <div class="material-button" @click="visible = true">素材库</div>
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
  <!--  <a-divider />
  <div class="default-point-item">
    <div class="c333">内间距</div>
    <a-radio-group :value="pageOptions.margin" class="flex-end flex" @change="handleChange($event, 'margin')">
      <a-radio-button :value="0">无间距</a-radio-button>
      <a-radio-button :value="10">10px</a-radio-button>
      <a-radio-button :value="20">20px</a-radio-button>
    </a-radio-group>
  </div>-->

  <!-- 素材库 -->
  <material-modal
    v-model:value="visible"
    dict-type="image_manage"
    dict-value="activity_page"
    :maxlength="1"
    @select="handleSelectMaterial"
  />
</template>

<script setup lang="ts">
import type { ActivityManage } from '/@/api/page-manage/activity-page';
import { computed, ref } from 'vue';
import uiInput from '/@/lib/UI/src/input/index';
import lock from './lock.vue';
import { pointStore } from '/@/store/modules/point';
import { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';

// 数据
const pageOptions = computed(() => pointStore.getPageOptionsState);
// 画布大小
const canvasSize = computed(() => pointStore.getCanvasSizeState);
// 对话框
const visible = ref<boolean>(false);

// 处理布局切换
function handleChange(e: Event, key: keyof ActivityManage) {
  const value = (e.target as unknown as { value: number }).value;

  handleUpdateData(value, key);
}

// 处理数据内容发生变化
function handleUpdateData(value: ActivityManage[keyof ActivityManage], key: keyof ActivityManage) {
  pointStore.commitUpdatePageOptionsState({ key, value });
}

// 处理选中的素材
function handleSelectMaterial([content]: ImageManage[]) {
  handleUpdateData(content.hash, 'backgroundImage');
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

.material-button {
  width: 60px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: @primary-color;
    text-decoration: underline;
  }
}
</style>
