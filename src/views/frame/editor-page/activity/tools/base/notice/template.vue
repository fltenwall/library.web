<template>
  <a-form-item label="公告文本">
    <ui-input v-model:value="dataItem.noticeContent" prop="noticeContent" />
  </a-form-item>
  <a-divider />
  <a-form-item label="标题颜色">
    <ui-color-picker v-model:value="dataItem.fontColor" prop="fontColor" />
  </a-form-item>
  <a-form-item label="背景色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-divider />
  <a-form-item label="滚动速度">
    <slider-input v-model:value="dataItem.speed" prop="speed" />
  </a-form-item>
  <a-form-item label="是否可关闭">
    <radio-group-button v-model:value="dataItem.closeable" :options="closeables" prop="closeable" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { UiColorPicker } from '/@/lib/UI/';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

//
const closeables = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
];
</script>

<style lang="less" scoped></style>
