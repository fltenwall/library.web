<template>
  <a-form-item label="固定最底部"> </a-form-item>
  <a-form-item label="使用粘性定位"> </a-form-item>
  <a-divider />
  <a-form-item label="背景颜色">
    <ui-color-picker v-model:value="dataItem.cardBgColor" prop="cardBgColor" />
  </a-form-item>
  <a-form-item label="字体大小">
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
  <a-divider />
  <a-form-item label="字体颜色">
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
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
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
