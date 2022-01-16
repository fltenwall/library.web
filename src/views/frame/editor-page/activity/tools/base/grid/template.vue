<template>
  <a-form-item label="链接">
    <ui-input v-model:value="dataItem.link" prop="label" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
