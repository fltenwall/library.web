<template>
  <div :class="`title-wrap title-${point.textAlign} title-${point.verticalAlign}`" :style="wrapStyle">
    <div :style="titleStyle">{{ point.title }}</div>
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
import type { Schema } from './schema';
import { reactive, useAttrs, computed } from 'vue';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

// 标题样式
const titleStyle = computed(() => ({
  color: point.titleColor,
  fontSize: `${point.titleSize}px`,
  fontWeight: point.titleWeight * 100
}));

// 最外层样式
const wrapStyle = computed(() => ({
  backgroundColor: point.bgColor,
  borderRadius: `${point.upperRadius}px ${point.upperRadius}px ${point.lowerPadding}px ${point.lowerPadding}px`
}));
</script>

<style lang="less" scoped>
.title-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

.title-center {
  justify-content: center;
}

.title-left {
  justify-content: flex-start;
}

.title-right {
  justify-content: flex-end;
}

.title-top {
  align-items: flex-start;
}

.title-middle {
  align-items: center;
}

.title-bottom {
  align-items: flex-end;
}
</style>
