<template>
  <div class="search-wrap" :style="wrapStyle">
    <div :class="`placeholder-word placeholder-word-${point.position}`" :style="contentStyle">
      {{ point.placeholder }}
    </div>
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
import { reactive, useAttrs, computed } from 'vue';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const wrapStyle = computed(
  (): CSSProperties => ({
    paddingTop: `${point.paddingY}px`,
    paddingLeft: `${point.paddingX}px`,
    paddingBottom: `${point.paddingY}px`,
    paddingRight: `${point.paddingX}px`,
    backgroundColor: point.bgColor,
    borderRadius: point.borderRadius
  })
);

const contentStyle = computed(
  (): CSSProperties => ({
    paddingTop: `${point.contentPaddingY}px`,
    paddingLeft: `${point.contentPaddingX}px`,
    paddingBottom: `${point.contentPaddingY}px`,
    paddingRight: `${point.contentPaddingX}px`,
    color: point.placeholderColor,
    fontSize: `${point.placeholderSize}px`,
    borderRadius: point.contentBorderRadius,
    backgroundColor: point.placeholderBgColor
  })
);
</script>

<style lang="less" scoped>
.search-wrap {
  width: 100%;
  height: 100%;
}

.placeholder-word {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #969799;
  background: #fff;

  &-left {
    justify-content: flex-start;
  }

  &-center {
    justify-content: center;
  }

  &-right {
    justify-content: flex-end;
  }
}
</style>
