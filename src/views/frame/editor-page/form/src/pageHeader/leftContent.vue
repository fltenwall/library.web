<template>
  <div class="header-left index-middle index-hidden-newline">
    <div class="index-theme header-left-title">表单样式设计</div>

    <div class="button index-center-middle ml-10 mr-4">
      <a-tooltip placement="bottom">
        <template #title>一键还原</template>
        <Icon
          icon="icons8:refresh"
          class="point-history"
          :disable="!resetState"
          @click="handleReset"
        />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>撤销</template>
        <Icon
          icon="la:undo"
          class="point-history mr-4 ml-4"
          :disable="!linkedState.undo"
          @click="handleUndo"
        />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>重做</template>
        <Icon
          icon="la:redo"
          class="point-history"
          :disable="!linkedState.redo"
          @click="handleRedo"
        />
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import pointLinked from '../../utils/pointLinked';
import { pointStore } from '/@/store/modules/point';
import { isEmptyArray } from '/@/utils/is';

export default defineComponent({
  setup() {
    const resetState = computed(() => isEmptyArray(pointStore.getPointDataState));
    // 使用链表
    const linked = pointLinked();
    // 一键还原
    function handleReset() {
      // 还原数据
      resetState.value && pointStore.commitResetData();
    }

    return { ...linked, handleReset, resetState };
  }
});
</script>

<style lang="less" scoped>
.header {
  &-left {
    height: 100%;
    font-size: 18px;
    color: @primary-color;

    &-title {
      font-weight: bold;
    }
  }
}

.point-history {
  font-size: 18px;
  cursor: pointer;

  &[disable='true'] {
    color: #dadde6;
    cursor: default;
  }

  &[disable='false'] {
    color: #5c5f66;

    &:hover {
      color: #292b33;
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

  &-reset {
    font-size: 14px;
    cursor: pointer;

    &[disabled='false'] {
      color: #dadde6;
      cursor: default;
    }
  }
}
</style>
