<template>
  <div class="header-left index-middle index-hidden-newline">
    <router-link class="index-theme header-left-title index-middle" :to="{ name: PageEnum.BASE_HOME }">
      <span>{{ MixinConfig.shortTitle }}</span>
    </router-link>
    <div :class="['index-center-middle simulator-item ml10', canvasMode === 1 && 'actived']">
      <icon icon="clarity:mobile-line" />
    </div>

    <div :class="['index-center-middle simulator-item ml1', canvasMode === 2 && 'actived']">
      <icon icon="clarity:computer-line" size="16" />
    </div>

    <div class="button index-center-middle ml10 mr4">
      <a-tooltip placement="bottom">
        <template #title>一键还原</template>
        <icon icon="icons8:refresh" class="point-button" :disable="!resetState" @click="handleReset" />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>撤销</template>
        <icon
          icon="la:undo"
          class="point-button mr4 ml4"
          :disable="!linked.linkedState.undo"
          @click="linked.handleUndo"
        />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>重做</template>
        <icon
          icon="la:redo"
          class="point-button"
          :disable="!linked.linkedState.redo"
          @click="linked.handleRedo"
        />
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import pointLinked from '../../utils/pointLinked';
import { pointStore } from '/@/store/modules/point';
import { isEmptyArray } from '/@/utils/is';
import { PageEnum } from '/@/enums/pageEnum';

const resetState = computed(() => isEmptyArray(pointStore.getPointDataState));

const canvasMode = computed(() => pointStore.getPageOptionsState.mode);
// 使用链表
const linked = pointLinked();
// 一键还原
function handleReset() {
  // 还原数据
  resetState.value && pointStore.commitResetData();
}
</script>

<style lang="less" scoped>
.header {
  &-left {
    height: 100%;
    font-size: 18px;

    &-title {
      font-weight: bold;
      color: @primary-color;

      &-logo {
        width: 20px;
        margin: 0 10px 0;
      }
    }
  }
}

.point-button {
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

  &-reset {
    font-size: 14px;
    cursor: pointer;

    &[disabled='false'] {
      color: #dadde6;
      cursor: default;
    }
  }
}

.simulator-item {
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 3px;

  &.actived {
    background: #f2f2f2;
  }
}
</style>
