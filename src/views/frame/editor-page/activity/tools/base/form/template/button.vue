<template>
  <a-form-item label="文本">
    <ui-input v-model:value="dataItem.buttonText" prop="buttonText" />
  </a-form-item>
  <a-form-item label="高度">
    <ui-input v-model:value="dataItem.buttonHeight" type="number" prop="buttonHeight" />
  </a-form-item>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.buttonBgColor" prop="buttonBgColor" />
  </a-form-item>
  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.buttonColor" prop="buttonColor" />
  </a-form-item>
  <a-form-item label="上边距">
    <slider-input v-model:value="dataItem.buttonMarginTop" prop="buttonMarginTop" />
  </a-form-item>
  <a-form-item label="左边距">
    <slider-input v-model:value="dataItem.buttonMarginRight" prop="buttonMarginRight" />
  </a-form-item>
  <a-form-item label="右边距">
    <slider-input v-model:value="dataItem.buttonMarginLeft" prop="buttonMarginLeft" />
  </a-form-item>
  <a-form-item label="字体大小">
    <slider-input v-model:value="dataItem.buttonSize" :min="12" :max="50" prop="buttonSize" />
  </a-form-item>
  <a-form-item label="字重">
    <slider-input v-model:value="dataItem.buttonWeight" :min="0" :max="10" prop="buttonWeight" />
  </a-form-item>
  <input-radius v-model:value="dataItem.buttonRadius" prop="buttonRadius" />
  <a-divider />
  <a-form-item label="请求方法">
    <ui-select v-model:value="dataItem.method" class="w-full" :options="methods" prop="method" />
  </a-form-item>
  <a-form-item label="接口地址" class="pb-2">
    <ui-textarea v-model:value="dataItem.apiLink" prop="buttonText" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from '../schema';
import { templateInit } from '../../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import { UiColorPicker, InputRadius, UiSelect, UiTextarea } from '/@/lib/UI/';
// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const methods = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' }
];
</script>

<style lang="less" scoped></style>
