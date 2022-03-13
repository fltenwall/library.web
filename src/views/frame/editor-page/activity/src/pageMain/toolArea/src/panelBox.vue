<template>
  <div class="panel-box" :draggable="draggable ? 'true' : 'false'" @dragstart="handleDragstart($event)">
    <div class="panel-box-content">
      <slot name="content" />
    </div>

    <div class="panel-box-title index-hidden-newline">
      <slot name="title" />
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
  },
  data: {
    type: Object,
    default: () => ({})
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

  const tool = { name, offset, data: props.data };

  // 数据传递
  event.dataTransfer?.setData('tool', JSON.stringify(tool));
}
</script>

<style lang="less" scoped>
.panel-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  transition: background-color 0.3s;

  &[draggable='true'] {
    cursor: grab;
  }

  &[draggable='false'] {
    cursor: pointer;
  }

  &:hover {
    color: #fff;
    background-color: @primary-color;
    border-radius: 2px;
  }

  &-title {
    flex-shrink: 0;
    width: 100%;
    padding: 3px 5px;
    font-size: 12px;
    text-align: center;
  }
}
</style>
