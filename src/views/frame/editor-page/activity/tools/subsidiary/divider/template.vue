<template>
  <a-form-item label="方向">
    <radio-group-button v-model:value="dataItem.type" :options="types" prop="type" />
  </a-form-item>
  <a-form-item label="颜色">
    <ui-color-picker v-model:value="dataItem.borderColor" prop="borderColor" />
  </a-form-item>
  <a-form-item label="尺寸">
    <slider-input v-model:value="dataItem.borderWidth" prop="borderWidth" />
  </a-form-item>
  <a-form-item label="样式">
    <ui-select v-model:value="dataItem.borderStyle" class="w-32" :options="borderStyles" prop="borderStyle" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { UiColorPicker, RadioGroupButton, SliderInput, UiSelect } from '/@/lib/UI/';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const types = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' }
];

const borderStyles = [
  { label: '点状', value: 'dotted' },
  { label: '实线', value: 'solid' },
  { label: '双线', value: 'double' },
  { label: '虚线', value: 'dashed' }
];
</script>

<style lang="less" scoped></style>
