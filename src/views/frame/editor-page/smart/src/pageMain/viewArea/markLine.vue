<template>
  <div
    v-for="line in lines"
    :key="line"
    :style="lineStatus[line]"
    class="line"
    :class="line.includes('x') ? 'xline' : 'yline'"
  />
</template>

<script setup lang="ts">
import type { PropType, CSSProperties } from 'vue';
import type { PointInfo } from '/@/lib/interface/PointInfo';
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { pointStore } from '/@/store/modules/point';
import { throttle } from 'lodash-es';

const props = defineProps({
  move: {
    type: Object as PropType<Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>>,
    default: () => ({})
  },
  uuid: {
    type: String,
    default: ''
  },
  isMove: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['on-suck']);

// 相距 dff 像素将自动吸附
const diff = 3;
// 分别对应三条横线和三条竖线
const lines = ref<string[]>(['x', 'y']);
// 线条状态
const lineStatus = ref<{ [key: string]: CSSProperties }>({ x: {}, y: {} });
// 拖拽数据信息
const pointData = computed(() => pointStore.getPointDataState);

// 展示线条
function handleShow() {
  const current = props.move;
  // 隐藏线条
  handleHide();
  // 不能为空
  if (!props.uuid) return;

  pointData.value.forEach((el) => {
    if (el.uuid === props.uuid) return;
    const { height, width, x, y } = el;

    if (isNearly(x!, current.x!)) {
      // 左边 - 左边
      handelShowStyle('y', x!, x!);
    } else if (isNearly(x! + width!, current.x!)) {
      // 左边 - 右边
      handelShowStyle('y', x! + width!, x! + width!);
    } else if (isNearly(x! + width! / 2, current.x!)) {
      // 左边 - 中间
      handelShowStyle('y', x! + width! / 2, x! + width! / 2);
    } else if (isNearly(current.x! + current.width!, x!)) {
      // 右边  - 左边
      handelShowStyle('y', x!, x! - current.width!);
    } else if (isNearly(current.x! + current.width!, x! + width!)) {
      // 右边  - 右边
      handelShowStyle('y', x! + width!, x! + width! - current.width!);
    } else if (isNearly(current.x! + current.width!, x! + width! / 2)) {
      // 右边  - 中间
      handelShowStyle('y', x! + width! / 2, x! + width! / 2 - current.width!);
    } else if (isNearly(current.x! + current.width! / 2, x!)) {
      // 中间  - 左边
      handelShowStyle('y', x!, x! - current.width! / 2);
    } else if (isNearly(current.x! + current.width! / 2, x! + width! / 2)) {
      // 中间  - 中间
      handelShowStyle('y', x! + width! / 2!, x! + width! / 2! - current.width! / 2);
    } else if (isNearly(current.x! + current.width! / 2, x! + width!)) {
      // 中间  - 右边
      handelShowStyle('y', x! + width!, x! + width! - current.width! / 2);
    }

    if (isNearly(current.y!, y!)) {
      // 上边 - 上边
      handelShowStyle('x', y!, y!);
    } else if (isNearly(current.y!, y! + height! / 2)) {
      // 上边 - 中间
      handelShowStyle('x', y! + height! / 2, y! + height! / 2);
    } else if (isNearly(current.y!, y! + height!)) {
      // 上边 - 下边
      handelShowStyle('x', y! + height!, y! + height!);
    } else if (isNearly(current.y! + current.height!, y!)) {
      // 下边 - 上边
      handelShowStyle('x', y!, y! - current.height!);
    } else if (isNearly(current.y! + current.height!, y! + height! / 2)) {
      // 下边 - 中间
      handelShowStyle('x', y! + height! / 2, y! + height! / 2 - current.height!);
    } else if (isNearly(current.y! + current.height!, y! + height!)) {
      // 下边 - 下标
      handelShowStyle('x', y! + height!, y! + height! - current.height!);
    } else if (isNearly(current.y! + current.height! / 2, y!)) {
      // 中间 - 上边
      handelShowStyle('x', y!, y! - current.height! / 2);
    } else if (isNearly(current.y! + current.height! / 2, y! + height! / 2)) {
      // 中间 - 中间
      handelShowStyle('x', y! + height! / 2, y! + height! / 2 - current.height! / 2);
    } else if (isNearly(current.y! + current.height! / 2, y! + height!)) {
      // 中间 - 下标
      handelShowStyle('x', y! + height!, y! + height! - current.height! / 2);
    }
  });
}

// 隐藏线条
function handleHide() {
  lineStatus.value = { x: {}, y: {} };
}

// 展示样式
function handelShowStyle(line: 'x' | 'y', move: number, vlaue: number) {
  if (move === 0) return;
  const state = { x: 'y', y: 'x' };
  lineStatus.value[line].display = 'inline';
  lineStatus.value[line].transform = `translate${state[line]}(${move}px)`;
  if (line === 'y') {
    emit('on-suck', { uuid: props.uuid, x: vlaue, y: move });
  } else {
    emit('on-suck', { uuid: props.uuid, y: vlaue, x: move });
  }
}

// 判断插值
function isNearly(dragValue: number, targetValue: number) {
  return Math.abs(dragValue - targetValue) <= diff;
}

// 使用节流函数
const throttled = throttle(handleShow, 0);

watch(
  () => props.move,
  () => throttled()
);

watch(
  () => props.isMove,
  (val) => !val && handleHide()
);
</script>

<style lang="less" scoped>
.line {
  position: absolute;
  z-index: 2;
  display: none;
}

.xline {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #0050b3, #0050b3 5px, transparent 5px, transparent);
  background-size: 10px 100%;
}

.yline {
  width: 1px;
  height: 100%;
  background: linear-gradient(to top, #0050b3, #0050b3 5px, transparent 5px, transparent);
  background-size: 100% 10px;
}
</style>
