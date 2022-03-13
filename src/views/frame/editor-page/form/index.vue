<template>
  <div class="flex flex-column editor-form-wrap">
    <!-- 头部 -->
    <page-header />
    <!-- 内容 -->
    <div class="flex flex-item hidden editor-form-main relative">
      <tool-area />

      <view-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import { unref } from 'vue';
import { useRouter } from 'vue-router';
import service from '/@/api/page-manage/form-page';
import pageHeader from './src/pageHeader/index.vue';
import toolArea from './src/pageMain/toolArea/index.vue';
import viewArea from './src/pageMain/viewArea/index.vue';
import { pointStore } from '/@/store/modules/form';

const { currentRoute } = useRouter();

// 通过ID加载数据
async function onLoadDataById(id: number) {
  const { data } = await service.getItemById(id);

  pointStore.commitSetPageOptionsState(data);

  console.log(data);
}

onLoadDataById(+unref(currentRoute).params.id);
</script>

<style lang="less">
.editor-form {
  &-wrap {
    height: 100vh;
    background: #f5f6fa;
  }

  &-header {
    position: relative;
    z-index: 11;
    height: 54px;
    padding-right: 0;
    background: #fff;
    box-shadow: 0 2px 4px 0 #dbdbdb99;
  }
}
</style>
