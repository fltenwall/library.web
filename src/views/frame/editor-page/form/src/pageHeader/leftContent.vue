<template>
  <div class="index-theme header-left index-middle index-hidden-newline">
    <div>表单样式设计</div>
    <div class="button index-center-middle ml-10 mr-4">
      <div class="button-reset">一键还原</div>
      <Icon
        icon="ion:arrow-undo-sharp"
        class="point-history mr-4 ml-4"
        :disable="!linkedState.undo"
        @click="handleUndo"
      />
      <Icon
        icon="ion:arrow-redo-sharp"
        class="point-history"
        :disable="!linkedState.redo"
        @click="handleRedo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pointLinked from '../../utils/pointLinked';

export default defineComponent({
  setup() {
    // 使用链表
    const linked = pointLinked();

    return { ...linked };
  }
});
</script>

<style lang="less" scoped>
.header {
  &-left {
    height: 100%;
    font-size: 18px;
    font-weight: bold;
    color: @primary-color;
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
    font-family: BlinkMacSystemFont;
    font-size: 14px;
    color: #dadde6;
    cursor: default;
  }
}
</style>
