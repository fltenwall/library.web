<template>
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.bgColor" prop="bgColor" />
  </a-form-item>
  <a-form-item label="边距">
    <slider-input v-model:value="dataItem.padding" prop="padding" />
  </a-form-item>
  <input-radius v-model:value="dataItem.borderRadius" prop="borderRadius" />
  <a-divider orientation="left">轮播图图片</a-divider>
  <select-image v-model:value="dataItem.list" prop="list" />
  <a-divider orientation="left">指示器</a-divider>
  <a-form-item label="选中颜色">
    <ui-color-picker v-model:value="dataItem.indicatorSelectColor" prop="indicatorSelectColor" />
  </a-form-item>
  <a-form-item label="未选中颜色">
    <ui-color-picker v-model:value="dataItem.indicatorUnselectColor" prop="indicatorUnselectColor" />
  </a-form-item>
  <a-form-item label="类型">
    <radio-group-button
      v-model:value="dataItem.indicatorType"
      :options="indicatorTypes"
      prop="indicatorType"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { SelectImage, UiColorPicker, SliderInput, RadioGroupButton, InputRadius } from '/@/lib/UI/';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();

const indicatorTypes = [
  { label: '圆点', value: 'dot' },
  { label: '线条', value: 'line' }
];
</script>

<style lang="less" scoped>
.swiper-list {
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

.material-button {
  width: 60px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: @primary-color;
    text-decoration: underline;
  }
}
</style>
