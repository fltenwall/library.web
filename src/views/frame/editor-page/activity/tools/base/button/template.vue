<template>
  <a-form-item label="链接">
    <ui-input v-model:value="dataItem.link" prop="label" />
  </a-form-item>
  <a-form-item label="指定模块">
    <ui-input v-model:value="dataItem.pointId" prop="pointId" />
  </a-form-item>
  <a-divider />
  <a-form-item label="按钮内容">
    <ui-input v-model:value="dataItem.text" prop="text" />
  </a-form-item>
  <a-form-item label="文字颜色">
    <ui-color-picker v-model:value="dataItem.textColor" prop="textColor" />
  </a-form-item>
  <a-form-item label="文字大小">
    <slider-input v-model:value="dataItem.textSize" :min="12" :max="50" prop="textSize" />
  </a-form-item>
  <a-divider />
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <input-radius v-model:value="dataItem.borderRadius" prop="borderRadius" />
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import { UiColorPicker, InputRadius } from '/@/lib/UI/';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
