<template>
  <a-form-item label="链接">
    <ui-input v-model:value="dataItem.link" prop="label" />
  </a-form-item>
  <a-form-item label="指定模块">
    <ui-select v-model:value="dataItem.pointId" prop="pointId" class="flex-1 w-0" :options="pointOptions" />
  </a-form-item>
  <a-divider />
  <a-form-item label="文本">
    <ui-input v-model:value="dataItem.text" prop="text" />
  </a-form-item>
  <a-form-item label="颜色">
    <ui-color-picker v-model:value="dataItem.textColor" prop="textColor" />
  </a-form-item>
  <a-form-item label="大小">
    <slider-input v-model:value="dataItem.textSize" :min="12" :max="50" prop="textSize" />
  </a-form-item>
  <a-divider />
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <input-radius v-model:value="dataItem.borderRadius" prop="borderRadius" />
  <a-divider />
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';
import { UiColorPicker, InputRadius, UiSelect } from '/@/lib/UI/';
import { pointStore } from '/@/store/modules/activity';
import { baseConfigs } from '../..';
import { isObject } from '/@/utils/is';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const pointData = computed(() => pointStore.getPointDataState.filter(({ id }) => id !== dataItem.id));

const pointOptions = computed(() =>
  unref(pointData).map(({ id: value, name }) => ({ value, label: `${labelParse(name)} (${value})` }))
);

function labelParse(name: string, key = 'template') {
  const result = baseConfigs.label[name];

  return isObject(result) ? result[key] : result;
}
</script>

<style lang="less" scoped></style>
