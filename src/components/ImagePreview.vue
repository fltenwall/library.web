<template>
  <div class="image-preview__wrap index-center-middle" @wheel="handelWheel">
    <draggable-offset
      class="full-width full-height"
      :is-position="true"
      @on-move="handelImageMove"
      @on-end="handelImageEnd"
    >
      <img class="image-preview" ondragstart="return false;" :src="src" :style="{ transform }" />
    </draggable-offset>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DraggableOffset } from '/@/lib/UI/index';

defineProps({
  src: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['on-instance']);

// 设置位移
const transform = ref('');
// 转换
let translate = { x: 0, y: 0 };
// 缩放
let scale = 1;

// 照片移动
function handelImageMove({ x, y }: { x: number; y: number }) {
  transform.value = `translate(${translate.x + x}px,${translate.y + y}px) scale(${scale},${scale})`;
}
// 照片结束移动
function handelImageEnd({ x, y }: { x: number; y: number }) {
  translate.x += x;
  translate.y += y;
}
// 处理滚动条滚动
function handelWheel(e: WheelEvent) {
  if ((e as unknown as { wheelDelta: number }).wheelDelta > 0) {
    // 放大
    scale = Number((scale + 0.1).toFixed(2));
  } else if (scale > 0.1) {
    // 缩小
    scale = Number((scale - 0.1).toFixed(2));
  }
  transform.value = `translate(${translate.x}px,${translate.y}px) scale(${scale},${scale})`;
}
// 初始化数据
function initPosition(ctx = { translate: { x: 0, y: 0 }, scale: 1 }) {
  scale = ctx.scale;
  translate = ctx.translate;

  transform.value = `translate(${translate.x}px,${translate.y}px) scale(${scale},${scale})`;
}

emit('on-instance', { initPosition });
</script>

<style lang="less" scoped>
.image-preview {
  height: 129px;
  margin: auto;
  pointer-events: none;
  user-select: none;

  &__wrap {
    position: relative;
    height: 149px;
    overflow: hidden;
    background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
      linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    border: 1px solid #e6e9ef;
    border-radius: 4px;
  }
}
</style>
