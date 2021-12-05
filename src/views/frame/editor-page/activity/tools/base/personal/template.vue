<template>
  <div></div>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { reactive } from 'vue';
import { templateInit } from '../../utils';

// 数据集合
const dataItem = reactive<Partial<Schema>>({});

templateInit<Partial<Schema>>(dataItem);
</script>

<style lang="less" scoped></style>
