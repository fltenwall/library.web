<template>
  <div class="flex flex-column editor-form-wrap">
    <!-- 头部 -->
    <page-header />
    <!-- 内容 -->
    <div class="flex flex-item hidden editor-form-main relative">
      <tool-area />
      <view-area />
      <action-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, unref } from 'vue';
import { useRouter } from 'vue-router';
import actionArea from './src/pageMain/actionArea/index.vue';
import toolArea from './src/pageMain/toolArea/index.vue';
import viewArea from './src/pageMain/viewArea/index.vue';
import pageHeader from './src/pageHeader/index.vue';
import service from '/@/api/page-manage/activity-page';
import { pointStore } from '/@/store/modules/point';

import useViewSize from './utils/useViewSize';

const { currentRoute } = useRouter();

// 视图大小
useViewSize();

// 通过ID加载数据
async function onLoadDataById(id: number) {
  const { data } = await service.getItemById(id);
  pointStore.commitSetPageOptionsState(data);
}

onBeforeUnmount(() => pointStore.commitEmptyState());

onLoadDataById(+unref(currentRoute).params.id);
</script>

<style lang="less" scoped>
.editor-form {
  &-wrap {
    height: 100vh;
    background: #f5f6fa;
  }

  &-header {
    position: relative;
    z-index: 11;
    height: 54px;
    background: #fff;
    box-shadow: 0 2px 4px 0 #dbdbdb99;
  }
}
</style>
