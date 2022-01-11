<template>
  <div class="countdown-wrap">
    <div>{{ revealTime.dd }}天</div>
    <div>{{ revealTime.hh }}时</div>
    <div>{{ revealTime.mm }}分</div>
    <div>{{ revealTime.ss }}秒</div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false
});
</script>

<!-- setup 执行项 -->
<script setup lang="ts">
import type { Schema } from './schema';
import { ref, reactive, useAttrs, watch } from 'vue';
import dayjs from 'dayjs';

enum stateEnum {
  // 待开始
  wait = 1,
  // 已开始
  started = 2,
  // 已结束
  ended = 3
}

const state = ref(stateEnum.wait);

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const duration = ref<number>(0);

const revealTime = computed(() => {
  let t = (duration.value / 1000) | 0;
  const ss = t % 60;
  t = (t - ss) / 60;
  if (t < 1) return { ss };
  const mm = t % 60;
  t = (t - mm) / 60;
  if (t < 1) return { mm, ss };
  const hh = t % 24;
  t = (t - hh) / 24;
  if (t < 1) return { hh, mm, ss };
  const dd = t;
  return { dd, hh, mm, ss };
});

watch(
  [() => point.startTime, () => point.endTime],
  () => {
    if (dayjs().isBefore(point.startTime)) {
      // 待开始
      duration.value = dayjs(point.startTime).valueOf() - dayjs().valueOf();
    } else if (dayjs().isBefore(point.endTime)) {
      // 进行中
      duration.value = dayjs(point.endTime).valueOf() - dayjs().valueOf();
    } else {
      // 结束
      duration.value = 0;
    }
    console.log(duration.value);
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.countdown-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
