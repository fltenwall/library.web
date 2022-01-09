<template>
  <div class="header-right flex">
    <div class="button pointer index-center-middle" @click="handleKeepData">保 存</div>
    <div class="button pointer index-center-middle">预 览</div>
    <div class="button-primary index-center-middle" @click="onGoBack">返 回</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { pointStore } from '/@/store/modules/point';
import { difference } from '/@/utils/difference';
import service from '/@/api/page-manage/activity-page';
import { message } from 'ant-design-vue';

const { back } = useRouter();

// 处理页面返回
const onGoBack = () => back();

// 处理保存数据
async function handleKeepData() {
  const optionsState = pointStore.getPageOptionsState;
  const optionsCache = pointStore.getPageOptionsCache;

  const pageOptions = difference(optionsState, optionsCache);
  const templateList = pointStore.getPointDataState;

  try {
    await service.updateH5Item(optionsCache.id!, { pageOptions, templateList });

    message.success('保存成功');
  } catch (err) {
    message.error((err as { msg: string }).msg);
  }
}
</script>

<style lang="less" scoped>
.header {
  &-right {
    .button {
      &-primary {
        height: 32px;
        padding: 0 16px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(0deg, #2c63ff, #2c83ff);
        border-radius: 16px;
        user-select: none;

        &:active {
          background: linear-gradient(0deg, #2758e5, #2775e5);
        }

        &:hover {
          background: linear-gradient(0deg, #4172ff, #418fff);
        }
      }
    }
  }
}

.button {
  height: 32px;
  padding: 0 16px;
  color: #5c5f66;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 #e6e9f2;
  user-select: none;

  &:hover {
    color: #292b33;
  }

  &:active {
    color: #2c63ff;
  }

  &:not(:last-of-type) {
    margin: 0 24px 0 0;
  }
}
</style>
