<template>
  <a-form-item label="文字">
    <ui-input v-model:value="dataItem.title" prop="title" />
  </a-form-item>
  <a-divider />
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <input-radius v-model:value="dataItem.borderRadius" prop="borderRadius" />

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
  <a-divider orientation="left">标题</a-divider>
  <a-form-item label="颜色">
    <ui-color-picker v-model:value="dataItem.titleColor" prop="titleColor" />
  </a-form-item>
  <a-form-item label="字体大小">
    <slider-input v-model:value="dataItem.titleSize" :min="12" :max="50" prop="titleSize" />
  </a-form-item>
  <a-form-item label="字重">
    <slider-input v-model:value="dataItem.titleWeight" :min="0" :max="10" prop="titleWeight" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { UiColorPicker, InputRadius } from '/@/lib/UI/';
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
