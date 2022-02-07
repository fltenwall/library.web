<template>
  <a-form-item label="文字">
    <ui-input v-model:value="dataItem.title" prop="title" />
  </a-form-item>
  <a-divider />
  <a-form-item label="标题颜色">
    <ui-color-picker v-model:value="dataItem.titleColor" prop="titleColor" />
  </a-form-item>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-divider />
  <a-form-item label="X 轴布局选择">
    <radio-group-button v-model:value="dataItem.textAlign" :options="textAligns" prop="textAlign" />
  </a-form-item>
  <a-form-item label="Y 轴布局选择">
    <radio-group-button
      v-model:value="dataItem.verticalAlign"
      :options="verticalAligns"
      prop="verticalAlign"
    />
  </a-form-item>
  <a-divider />
  <a-form-item label="标题字体">
    <slider-input v-model:value="dataItem.titleSize" :min="12" :max="50" prop="titleSize" />
  </a-form-item>
  <a-form-item label="上边圆角">
    <slider-input v-model:value="dataItem.upperRadius" prop="upperRadius" />
  </a-form-item>
  <a-form-item label="下边圆角">
    <slider-input v-model:value="dataItem.lowerPadding" prop="lowerPadding" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import uiInput from '/@/lib/UI/src/input/index';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

// 布局选择
const textAligns = [
  { label: '左', value: 'left' },
  { label: '中', value: 'center' },
  { label: '右', value: 'right' }
];

const verticalAligns = [
  { label: '顶', value: 'top' },
  { label: '中', value: 'middle' },
  { label: '底', value: 'bottom' }
];
</script>

<style lang="less" scoped></style>
