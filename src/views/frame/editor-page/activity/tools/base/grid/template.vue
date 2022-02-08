<template>
  <a-form-item label="固定最底部">
    <radio-group-button v-model:value="dataItem.fixed" :options="fixeds" prop="fixed" />
  </a-form-item>
  <a-form-item label="使用粘性定位"> </a-form-item>
  <a-form-item label="显示类型">
    <radio-group-button v-model:value="dataItem.type" :options="types" prop="type" />
  </a-form-item>
  <a-form-item label="每行个数">
    <ui-select v-model:value="dataItem.showNum" class="w-41" :options="showNums" prop="showNum" />
  </a-form-item>
  <a-form-item label="显示行数">
    <ui-select v-model:value="dataItem.showRow" class="w-41" :options="showNums" prop="showRow" />
  </a-form-item>
  <a-divider orientation="left">选项</a-divider>
  <select-image-rows v-model:value="dataItem.list" prop="list" />
  <a-divider orientation="left">选择项</a-divider>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.cardBgColor" prop="cardBgColor" />
  </a-form-item>
  <a-form-item label="文字大小">
    <slider-input v-model:value="dataItem.fontSize" :min="12" :max="50" prop="fontSize" />
  </a-form-item>
  <a-form-item label="图片宽度">
    <slider-input v-model:value="dataItem.iconWidth" prop="iconWidth" />
  </a-form-item>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.cardBorderRadius" prop="cardBorderRadius" />
  </a-form-item>
  <a-form-item label="间隔">
    <slider-input v-model:value="dataItem.interval" prop="interval" />
  </a-form-item>
  <a-divider orientation="left">导航栏</a-divider>
  <!-- 背景 -->
  <a-form-item label="文字颜色">
    <ui-color-picker v-model:value="dataItem.fontColor" prop="fontColor" />
  </a-form-item>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="左右边距">
    <slider-input v-model:value="dataItem.paddingY" prop="paddingY" />
  </a-form-item>
  <a-form-item label="上边距">
    <slider-input v-model:value="dataItem.paddingTop" prop="paddingTop" />
  </a-form-item>
  <a-form-item label="下边距">
    <slider-input v-model:value="dataItem.paddingBottom" prop="paddingBottom" />
  </a-form-item>
  <a-form-item label="上圆角">
    <slider-input v-model:value="dataItem.radiusTop" prop="radiusTop" />
  </a-form-item>
  <a-form-item label="下圆角">
    <slider-input v-model:value="dataItem.radiusBottom" prop="radiusBottom" />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { ColorPicker as uiColorPicker, SelectImageRows } from '/@/lib/UI/';
import { Select as UiSelect, sliderInput } from '/@/lib/UI/';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const types = [
  { label: '图片', value: 'image' },
  { label: '文字', value: 'text' },
  { label: '图文', value: 'image-text' }
];

const fixeds = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
];

const showNums = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 }
];
</script>

<style lang="less" scoped>
.grid-list {
  padding: 10px;
  background: #f7f8fa;

  &-box {
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0.05333333rem 0.10666667rem rgb(0 0 0 / 10%);

    &:not(:first-of-type) {
      margin-top: 10px;
    }
  }
}
</style>
