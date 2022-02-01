<template>
  <div :class="`countdown-wrap countdown-${point.position}`" :style="wrapStyle">
    {{ title }}
    <template v-if="state !== stateEnum.ended">
      <div class="countdown-time" :style="timeStyle">{{ String(time.hh || 0).padStart(2, '0') }}</div>
      <div>{{ ['', '时', ':'][point.theme] }}</div>

      <div class="countdown-time" :style="timeStyle">{{ String(time.mm || 0).padStart(2, '0') }}</div>
      <div>{{ ['', '分', ':'][point.theme] }}</div>

      <div class="countdown-time" :style="timeStyle">{{ String(time.ss || 0).padStart(2, '0') }}</div>
      <div>{{ ['', '秒', ''][point.theme] }}</div>
    </template>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
export default defineComponent({
  inheritAttrs: false
});
</script>

<!-- setup 执行项 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { Schema } from './schema';
import { ref, reactive, useAttrs, watch, computed } from 'vue';
import dayjs from 'dayjs';

enum stateEnum {
  // 待开始
  wait = 1,
  // 已开始
  started = 2,
  // 已结束
  ended = 3
}

const state = ref(stateEnum.ended);

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const duration = ref<number>(0);

const time = ref<{ hh?: number; mm?: number; ss?: number }>({});

const title = computed(() => ['', point.waitTitle, point.startedTitle, point.endedTitle][state.value]);

// 倒计时实例
let timeCounter: NodeJS.Timeout;

const timeStyle = computed(
  (): CSSProperties => ({
    color: point.timeFontColor,
    backgroundColor: point.timeBgColor,
    borderRadius: `${point.borderRadius}px`
  })
);

const wrapStyle = computed(
  (): CSSProperties => ({
    color: point.fontColor,
    backgroundColor: point.bgColor
  })
);

onUnmounted(() => clearTimeout(timeCounter));

watch(
  [() => point.startTime, () => point.endTime],
  () => {
    clearTimeout(timeCounter);
    // 开始倒计时
    countDown();
  },
  { immediate: true }
);

// 计算时间
function handleDuration() {
  if (dayjs().isBefore(point.startTime)) {
    // 待开始
    duration.value = dayjs(point.startTime).valueOf() - dayjs().valueOf();
    state.value = stateEnum.wait;
  } else if (dayjs().isBefore(point.endTime)) {
    // 进行中
    duration.value = dayjs(point.endTime).valueOf() - dayjs().valueOf();
    state.value = stateEnum.started;
  } else {
    // 结束
    duration.value = 0;
    state.value = stateEnum.ended;
  }
}

// 格式化时间
function revealTime() {
  let t = (duration.value / 1000) | 0;
  const ss = t % 60;
  t = (t - ss) / 60;
  if (t < 1) return { ss };
  const mm = t % 60;
  t = (t - mm) / 60;
  if (t < 1) return { mm, ss };
  const hh = t;
  return { hh, mm, ss };
}

// 倒计时开始
function countDown() {
  handleDuration();

  time.value = revealTime();

  state.value !== stateEnum.ended && (timeCounter = setTimeout(countDown, 500));
}
</script>

<style lang="less" scoped>
.countdown {
  &-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 15px;
  }

  &-time {
    padding: 0 5px;
    margin: 0 5px;
  }

  &-left {
    justify-content: flex-start;
  }

  &-right {
    justify-content: flex-end;
  }

  &-center {
    justify-content: center;
  }
}
</style>
