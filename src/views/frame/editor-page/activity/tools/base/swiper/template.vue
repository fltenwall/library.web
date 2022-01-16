<template>
  <a-form-item label="圆角边距">
    <slider-input v-model:value="dataItem.borderRadius" prop="borderRadius" />
  </a-form-item>
  <a-form-item label="边距">
    <slider-input v-model:value="dataItem.padding" prop="padding" />
  </a-form-item>
  <a-divider />
  <div class="swiper-list">
    <div v-for="(item, index) in dataItem.list" :key="index" class="swiper-list-box">
      <a-form-item label="图片地址">
        <ui-input v-model:value="item.image" readonly allow-clear :prop="`list.${index}.image`" />
      </a-form-item>
      <a-form-item label="链接">
        <ui-input v-model:value="item.link" :prop="`list.${index}.link`" />
      </a-form-item>
      <div class="mt2 flex justify-end">
        <a-button type="link" size="small" class="fs3 mr1" @click="handleOpenMaterial(index)">
          素材库
        </a-button>
        <a-button type="link" size="small" class="fs3 red" @click="handleDeleteBox(index)">删除</a-button>
      </div>
    </div>
    <a-button class="mt3 w-full" @click="handleAddBox"> 新增</a-button>
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
import sliderInput from '/@/lib/UI/src/slider/sliderInput';

const pointid = computed(() => pointStore.getPointidState);
// 对话框
const visible = ref<boolean>(false);
// 响应式数据
const dataItem = templateInit<Partial<Schema>>();
// 当前点击下标
let currentIndex: number;

function handleAddBox() {
  const key = `list.${dataItem.list?.length}`;
  const value = { link: '', image: '' } as never;
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
