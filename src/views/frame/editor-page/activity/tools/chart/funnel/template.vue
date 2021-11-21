<template>
  <a-form-item label="字段名称">
    <ui-input v-model:value="dataItem.label" prop="label" />
  </a-form-item>
  <a-form-item label="提示信息">
    <ui-input v-model:value="dataItem.placeholder" prop="placeholder" />
  </a-form-item>
  <a-form-item label="输入长度">
    <ui-input v-model:value="dataItem.maxlength" prop="maxlength" type="number" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { reactive } from 'vue';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';

// 数据集合
const dataItem = reactive<Partial<Schema>>({});
// 响应式数据
templateInit<Partial<Schema>>(dataItem);
</script>

<style lang="less" scoped></style>
