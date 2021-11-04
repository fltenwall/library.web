<template>
  <div class="image-manage">
    <image-menu @on-select="handleSelected" @on-data-source="handleMenuData" />
    <div class="w-5"></div>
    <image-view :selected="selected" :menu-data="menuData" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Classify } from '/@/api/basis-manage/material-manage/image-manage';
import imageMenu from './imageMenu.vue';
import imageView from './imageView.vue';
import { assign } from 'lodash';

const selected = reactive<Classify>({});
// 菜单数据
const menuData = ref<Required<Classify>[]>([]);

// 处理选中
function handleSelected(record: Required<Classify>) {
  assign(selected, record);
}

// 处理菜单数据
function handleMenuData(data: Required<Classify>[]) {
  menuData.value = data;
}
</script>

<style lang="less" scoped>
.image-manage {
  display: flex;
  height: calc(100% - 32px);
  margin: 16px;
}
</style>
