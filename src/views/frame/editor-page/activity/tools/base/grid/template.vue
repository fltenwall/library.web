<template>
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
  <a-divider />
  <a-form-item label="显示类型">
    <radio-group-button v-model:value="dataItem.type" :options="types" prop="type" />
  </a-form-item>
  <a-form-item label="一行展示个数">
    <radio-group-button v-model:value="dataItem.showNum" :options="showNums" prop="showNum" />
  </a-form-item>

  <a-divider />
  <div class="grid-list">
    <div v-for="(item, index) in dataItem.list" :key="index" class="grid-list-box">
      <a-form-item label="导航名称">
        <ui-input v-model:value="item.label" :prop="`list.${index}.label`" />
      </a-form-item>
      <a-form-item label="图片地址">
        <ui-input v-model:value="item.image" readonly allow-clear :prop="`list.${index}.image`" />
      </a-form-item>
      <a-form-item label="跳转链接">
        <ui-input v-model:value="item.link" :prop="`list.${index}.link`" />
      </a-form-item>
      <div class="mt2 flex justify-end">
        <a-button type="link" size="small" class="fs3 mr1" @click="handleOpenMaterial(index)"
          >素材库</a-button
        >
        <a-button type="link" size="small" class="fs3 red" @click="handleDeleteBox(index)">删除</a-button>
      </div>
    </div>
    <a-button class="mt3 w-full" @click="handleAddBox">新增</a-button>
  </div>

  <!-- 素材库 -->
  <material-modal
    v-model:value="visible"
    dict-type="image_manage"
    dict-value="activity_page"
    :maxlength="1"
    @select="handleSelectMaterial"
  />
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { computed, ref } from 'vue';
import { templateInit } from '../../utils';
import uiInput from '/@/lib/UI/src/input/index';
import { pointStore } from '/@/store/modules/point';
import { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import radioGroupButton from '/@/lib/UI/src/radio/radioGroupButton';
import { ColorPicker as uiColorPicker } from '/@/lib/UI/';
import sliderInput from '/@/lib/UI/src/slider/sliderInput';

const pointid = computed(() => pointStore.getPointidState);
// 对话框
const visible = ref<boolean>(false);
// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
// 当前点击下标
let currentIndex: number;

const types = [
  { label: '图片', value: 'image' },
  { label: '文字', value: 'text' },
  { label: '图文', value: 'image-text' }
];

const showNums = [
  { label: '1 个', value: 1 },
  { label: '2 个', value: 2 },
  { label: '3 个', value: 3 },
  { label: '4 个', value: 4 },
  { label: '5 个', value: 5 },
  { label: '6 个', value: 6 }
];

function handleAddBox() {
  const key = `list.${dataItem.list?.length}`;
  const value = { link: '', image: '', label: '' } as never;
  pointStore.commitUpdatePointData({ id: pointid.value, key, value });
}

function handleOpenMaterial(index: number) {
  currentIndex = index;
  visible.value = true;
}

function handleSelectMaterial([content]: ImageManage[]) {
  const key = `list.${currentIndex}.image`;
  const value = content.hash as never;
  pointStore.commitUpdatePointData({ id: pointid.value, key, value });
}

function handleDeleteBox(index: number) {
  const key = `list.${index}`;

  pointStore.commitUpdatePointData({ id: pointid.value, key, type: 'delete' });
}
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
