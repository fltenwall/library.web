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
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import uiInput from '/@/lib/UI/src/input/index';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
