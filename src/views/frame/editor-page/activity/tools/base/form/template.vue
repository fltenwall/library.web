<template>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="上边距">
    <slider-input v-model:value="dataItem.paddingTop" prop="paddingTop" />
  </a-form-item>
  <a-form-item label="左边距">
    <slider-input v-model:value="dataItem.paddingLeft" prop="paddingLeft" />
  </a-form-item>
  <a-form-item label="右边距">
    <slider-input v-model:value="dataItem.paddingRight" prop="paddingRight" />
  </a-form-item>
  <input-radius v-model:value="dataItem.borderRadius" prop="borderRadius" />
  <a-form-item label="每行个数">
    <ui-select v-model:value="dataItem.showCol" class="w-0 flex-1" :options="showCols" prop="showCol" />
  </a-form-item>
  <a-divider />
  <a-form-item label="布局">
    <radio-group-button v-model:value="dataItem.layout" prop="layout">
      <a-radio-button value="horizontal">水平排列</a-radio-button>
      <a-radio-button value="vertical">垂直排列</a-radio-button>
    </radio-group-button>
  </a-form-item>
  <a-form-item label="高度">
    <ui-input v-model:value="dataItem.widgetHeight" type="number" prop="widgetHeight" />
  </a-form-item>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.widgetbgColor" prop="widgetbgColor" />
  </a-form-item>
  <a-form-item label="边框颜色">
    <ui-color-picker v-model:value="dataItem.widgetBorderColor" prop="widgetBorderColor" />
  </a-form-item>
  <a-form-item label="边框宽度">
    <ui-input v-model:value="dataItem.widgetBorderWidth" prop="widgetBorderWidth" />
  </a-form-item>
  <a-form-item label="上边距">
    <slider-input v-model:value="dataItem.widgetMarginTop" prop="widgetMarginTop" />
  </a-form-item>
  <a-form-item label="左边距">
    <slider-input v-model:value="dataItem.widgetMarginLeft" prop="widgetMarginLeft" />
  </a-form-item>
  <input-radius v-model:value="dataItem.widgetRadius" prop="widgetRadius" />
  <widget v-model:value="dataItem.list" prop="list" />
  <a-divider />
  <a-form-item label="位置">
    <radio-group-button v-model:value="dataItem.labelAlign" :options="textAligns" prop="labelAlign" />
  </a-form-item>
  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.labelColor" prop="labelColor" />
  </a-form-item>

  <a-form-item label="内容宽度">
    <ui-input v-model:value="dataItem.labelWidth" type="number" prop="labelWidth" />
  </a-form-item>
  <a-form-item label="左边距">
    <slider-input v-model:value="dataItem.labelMarginLeft" prop="labelMarginLeft" />
  </a-form-item>
  <a-form-item label="右边距">
    <slider-input v-model:value="dataItem.labelMarginRight" prop="labelMarginRight" />
  </a-form-item>
  <a-form-item label="下边距">
    <slider-input v-model:value="dataItem.labelMarginBottom" prop="labelMarginBottom" />
  </a-form-item>
  <a-form-item label="字重">
    <slider-input v-model:value="dataItem.labelWeight" :min="0" :max="10" prop="labelWeight" />
  </a-form-item>
  <a-form-item label="字体大小">
    <slider-input v-model:value="dataItem.labelSize" :min="12" :max="50" prop="labelSize" />
  </a-form-item>
  <a-divider />

  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.entryColor" prop="entryColor" />
  </a-form-item>
  <a-form-item label="边框颜色">
    <ui-color-picker v-model:value="dataItem.entryBorderColor" prop="entryBorderColor" />
  </a-form-item>
  <a-form-item label="边框宽度">
    <ui-input v-model:value="dataItem.entryBorderWidth" prop="entryBorderWidth" />
  </a-form-item>
  <input-radius v-model:value="dataItem.entryRadius" prop="entryRadius" />
  <a-form-item label="字体大小">
    <slider-input v-model:value="dataItem.entrySize" prop="entrySize" />
  </a-form-item>
  <a-form-item label="左外边距">
    <slider-input v-model:value="dataItem.entryMarginLeft" prop="entryMarginLeft" />
  </a-form-item>
  <a-form-item label="右外边距">
    <slider-input v-model:value="dataItem.entryMarginRight" prop="entryMarginRight" />
  </a-form-item>
  <a-form-item label="左内边距">
    <slider-input v-model:value="dataItem.entryPaddingLeft" prop="entryPaddingLeft" />
  </a-form-item>
  <a-form-item label="右内边距">
    <slider-input v-model:value="dataItem.entryPaddingRight" prop="entryPaddingRight" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';
import { UiColorPicker, InputRadius, UiSelect } from '/@/lib/UI/';
import widget from './components/widget.vue';
// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const textAligns = [
  { value: 'left', label: '左' },
  { value: 'center', label: '中' },
  { value: 'right', label: '右' }
];

const showCols = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
];
</script>

<style lang="less" scoped></style>
