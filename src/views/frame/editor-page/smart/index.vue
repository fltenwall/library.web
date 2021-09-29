<template>
  <div class="flex flex-column editor-form-wrap">
    <!-- 头部 -->
    <page-header />
    <!-- 内容 -->
    <div class="flex flex-item hidden editor-form-main relative">
      <tool-area />
      <view-area class="flex-item" @on-click-point="handleClickPoint" />
      <action-area v-model:value="actionItem.visible" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, unref } from 'vue';
import { useRouter } from 'vue-router';
import actionArea from './src/pageMain/actionArea/index.vue';
import toolArea from './src/pageMain/toolArea/index.vue';
import viewArea from './src/pageMain/viewArea/index.vue';
import pageHeader from './src/pageHeader/index.vue';
import service from '/@/api/page-manage/form-page';
import { pointStore } from '/@/store/modules/point';

import useViewSize from './utils/useViewSize';

export default defineComponent({
  components: { actionArea, toolArea, viewArea, pageHeader },
  setup() {
    const { currentRoute } = useRouter();

    const actionItem = reactive<{ visible: boolean }>({ visible: false });

    // 视图大小
    useViewSize();

    // 通过ID加载数据
    async function onLoadDataById(id: number) {
      const { data } = await service.getItemById(id);
      pointStore.commitSetPageOptionsState(data);
    }

    // 点击 point
    function handleClickPoint() {
      actionItem.visible = false;
    }

    onBeforeUnmount(() => pointStore.commitEmptyState());

    onLoadDataById(+unref(currentRoute).params.id);

    return {
      actionItem,
      handleClickPoint
    };
  }
});
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
