<template>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="左右边距">
    <slider-input v-model:value="dataItem.paddingX" prop="paddingX" />
  </a-form-item>
  <a-form-item label="上下边距">
    <slider-input v-model:value="dataItem.paddingY" prop="paddingY" />
  </a-form-item>
  <a-divider />
  <a-form-item label="底纹词">
    <ui-input v-model:value="dataItem.placeholder" prop="placeholder" />
  </a-form-item>
  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.placeholderColor" prop="placeholderColor" />
  </a-form-item>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.placeholderBgColor" prop="placeholderBgColor" />
  </a-form-item>
  <a-form-item label="文本位置">
    <radio-group-button v-model:value="dataItem.position" :options="positions" prop="position" />
  </a-form-item>
  <a-form-item label="字体大小">
    <slider-input v-model:value="dataItem.placeholderSize" prop="placeholderSize" :min="12" :max="50" />
  </a-form-item>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.borderRadius" prop="borderRadius" />
  </a-form-item>
  <a-form-item label="左右边距">
    <slider-input v-model:value="dataItem.contentPaddingX" prop="contentPaddingX" />
  </a-form-item>
  <a-form-item label="上下边距">
    <slider-input v-model:value="dataItem.contentPaddingY" prop="contentPaddingY" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const positions = [
  { label: '左', value: 'left' },
  { label: '中', value: 'center' },
  { label: '右', value: 'right' }
];
</script>

<style lang="less" scoped></style>
