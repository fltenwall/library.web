<template>
  <div class="divider-wrap">
    <div :style="dividerStyle" :class="`divider-${point.type}`"></div>
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

const borderWidth = computed(() => `${point.borderWidth}px`);

const dividerStyle = computed(
  (): CSSProperties => ({
    borderColor: point.borderColor,
    borderStyle: point.borderStyle
  })
);
</script>

<style lang="less" scoped>
.divider {
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  &-horizontal {
    width: 100%;
    border-top-width: v-bind(borderWidth);
  }

  &-vertical {
    height: 100%;
    border-left-width: v-bind(borderWidth);
  }
}
</style>
