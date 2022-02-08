<template>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.borderRadius" prop="borderRadius" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { ColorPicker as uiColorPicker, sliderInput } from '/@/lib/UI/';
// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
