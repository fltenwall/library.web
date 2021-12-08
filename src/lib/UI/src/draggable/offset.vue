<template>
  <div class="ui-draggable-offset">
    <div class="move-area-view" @mousedown="startMove($event, 'mouse')">
      <slot />
    </div>
    <div v-if="isSize" class="ew absolute size" @mousedown.prevent="startMove($event, 'ew')" />
    <div v-if="isSize" class="ns absolute size" @mousedown.prevent="startMove($event, 'ns')" />
    <div v-if="isSize" class="se absolute size" @mousedown.prevent="startMove($event, 'se')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Type = 'mouse' | 'ew' | 'ns' | 'se';

export default defineComponent({
  props: {
    isSize: {
      // 是否可以改变大小
      type: Boolean,
      default: false
    },
    isPosition: {
      // 是否可以改变尺寸
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['on-move', 'on-end', 'on-start', 'on-click'],
  setup(props, { emit }) {
    // 开始位置
    let startX: number, startY: number;
    // 位移数据
    let distanceX = 0;
    let distanceY = 0;
    // 事件名称
    let eventType: Type;
    // 鼠标按下
    function startMove(event: MouseEvent, name: Type) {
      // 判断鼠标按键
      if (event.button !== 0) return;
      // 禁止移动
      if (!props.isPosition && name === 'mouse') {
        emit('on-click', { record: props.record });
        return;
      }
      // 设置开始位置
      startX = event.pageX;
      startY = event.pageY;
      // 事件类型
      eventType = name;

      emit('on-start', { record: props.record, type: eventType });
      // 设置移动事件 鼠标抬起事件
      document.addEventListener('mousemove', moving, false);
      document.addEventListener('mouseup', endMove, false);
    }

    // 拖拽移动事件
    function moving(event: MouseEvent) {
      // 获取移动 时 x, y 位置
      const currentX = event.pageX;
      const currentY = event.pageY;
      // 计算 开始移动 到 此刻的 距离
      distanceX = currentX - startX;
      distanceY = currentY - startY;

      emit('on-move', { record: props.record, x: distanceX, y: distanceY, type: eventType });
    }

    // 拖拽结束事件
    function endMove() {
      // 没有移动不更新
      emit('on-end', { record: props.record, x: distanceX, y: distanceY, type: eventType });

      // 清空数据
      distanceX = distanceY = 0;

      // 移除移动事件 鼠标抬起事件
      document.removeEventListener('mousemove', moving);
      document.removeEventListener('mouseup', endMove);
    }

    return { startMove };
  }
});
</script>

<style lang="less">
.ui-draggable-offset {
  position: absolute;

  .ew {
    top: 50%;
    right: 0;
    cursor: ew-resize;
    transform: translateY(-50%) rotate(315deg);
  }

  .ns {
    bottom: 0;
    left: 50%;
    cursor: ns-resize;
    transform: translateX(-50%) rotate(45deg);
  }

  .se {
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }

  .size {
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }

  .move-area-view {
    width: 100%;
    height: 100%;
  }
}
</style>
