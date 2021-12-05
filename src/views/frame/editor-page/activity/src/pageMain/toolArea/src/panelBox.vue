<template>
  <div class="panel-box" :draggable="draggable ? 'true' : 'false'" @dragstart="handleDragstart($event)">
    <div class="panel-box-content index-center-middle flex-item">
      <slot name="content" />
    </div>
    <div class="panel-box-title index-hidden-newline">
      <slot name="title" />
    </div>
    <div v-if="!!$slots.tag" class="panel-box-tag">
      <slot name="tag" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  name: {
    type: String as PropType<string>,
    default: ''
  },
  draggable: {
    type: Boolean,
    default: true
  }
});

// 处理拖拽开始
function handleDragstart(event: DragEvent) {
  // 判断是否可以拖拽
  if (!props.draggable) return;
  // 获取鼠标点击位置
  const { offsetX, offsetY, target } = event;

  const { clientHeight: height, clientWidth: width } = target as HTMLElement;

  const name = props.name;

  const offset = { x: width / 2 - offsetX, y: height / 2 - offsetY };

  const tool = { name, offset };

  // 数据传递
  event.dataTransfer?.setData('tool', JSON.stringify(tool));
}
</script>

<style lang="less" scoped>
.panel-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 105px;
  height: 105px;
  margin: 5px 0;
  border: 1px solid hsla(0, 0%, 62%, 0.24);
  transition: all 0.3s;

  &[draggable='true'] {
    cursor: move;
  }

  &[draggable='false'] {
    cursor: pointer;
  }

  &.select {
    color: @primary-color;
    border-color: #91d5ff;
  }

  &:hover {
    color: @primary-color;
    border-color: @primary-color;

    .panel-box-title {
      color: @primary-color;
    }
  }

  &:nth-of-type(2n + 2) {
    margin: 5px 0 5px 10px;
  }

  &-title {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 3px 5px;
    font-size: 12px;
    color: #767676;
    text-align: center;
    background: #f5f5f5;
  }

  &-tag {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 5px;
    font-size: 12px;
    color: #1890ff;
    background: #e6f7ff;
    border-bottom: 1px solid #91d5ff;
    border-left: 1px solid #91d5ff;
  }

  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>
