<template>
  <a-form-item label="开始时间">
    <ui-date-picker
      v-model:value="dataItem.startTime"
      show-time
      allow-clear
      default-time="00:00:00"
      prop="startTime"
    />
  </a-form-item>
  <a-form-item label="结束时间">
    <ui-date-picker
      v-model:value="dataItem.endTime"
      show-time
      allow-clear
      default-time="23:59:59"
      prop="endTime"
    />
  </a-form-item>
  <a-divider />
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { DatePicker as uiDatePicker } from '/@/lib/UI/';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
