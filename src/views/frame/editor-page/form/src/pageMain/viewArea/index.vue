<template>
  <scrollbar class="flex-1">
    <div class="view-area pc">
      <draggable-container v-model:value="pointData" group="form">
        <template #default="{ record }">
          {{ record }}
        </template>
      </draggable-container>
    </div>
  </scrollbar>
</template>

<script lang="ts" setup>
import { Scrollbar } from '/@/components/Scrollbar';
import { DraggableContainer } from '/@/lib/UI/index';
import { pointStore } from '/@/store/modules/form';

// 拖拽数据信息
const pointData = computed({
  get: () => pointStore.getPointDataState,
  set: (val) => pointStore.commitUpdatePointData(val)
});
</script>

<style lang="less" scoped>
.view-area {
  background: #fff;

  &.pc {
    height: calc(100% - 32px);
    margin: 16px;
  }
}
</style>
