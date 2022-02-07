<template>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.borderRadius" prop="borderRadius" />
  </a-form-item>
  <a-form-item label="边距">
    <slider-input v-model:value="dataItem.padding" prop="padding" />
  </a-form-item>
  <a-divider orientation="left">轮播图图片</a-divider>
  <select-image v-model:value="dataItem.list" prop="list" />
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';
import { SelectImage } from '/@/lib/UI/';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';

// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
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
