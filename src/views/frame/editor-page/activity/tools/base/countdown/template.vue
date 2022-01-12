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
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.fontColor" prop="fontColor" />
  </a-form-item>
  <a-divider orientation="left">
    <span class="fs3">倒计时样式</span>
  </a-divider>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.timeBgColor" prop="timeBgColor" />
  </a-form-item>
  <a-form-item label="字体颜色">
    <ui-color-picker v-model:value="dataItem.timeFontColor" prop="timeFontColor" />
  </a-form-item>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.borderRadius" prop="borderRadius" />
  </a-form-item>
  <a-form-item label="主题">
    <radio-group-button v-model:value="dataItem.styleTheme" :options="styleThemes" prop="styleTheme" />
  </a-form-item>

  <a-form-item label="位置">
    <radio-group-button v-model:value="dataItem.position" :options="positions" prop="position" />
  </a-form-item>

  <a-divider orientation="left">
    <span class="fs3">未开始状态设置</span>
  </a-divider>
  <a-form-item label="标题">
    <ui-input v-model:value="dataItem.waitTitle" prop="waitTitle" />
  </a-form-item>
  <a-divider orientation="left">
    <span class="fs3">已开始状态设置</span>
  </a-divider>
  <a-form-item label="标题">
    <ui-input v-model:value="dataItem.startedTitle" prop="startedTitle" />
  </a-form-item>
  <a-divider orientation="left">
    <span class="fs3">已结束状态设置</span>
  </a-divider>
  <a-form-item label="标题">
    <ui-input v-model:value="dataItem.endedTitle" prop="endedTitle" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import { DatePicker as uiDatePicker } from '/@/lib/UI/';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const styleThemes = [
  { label: '一', value: 1 },
  { label: '二', value: 2 }
];

const positions = [
  { label: '左', value: 'left' },
  { label: '中', value: 'center' },
  { label: '右', value: 'right' }
];
</script>

<style lang="less" scoped></style>
