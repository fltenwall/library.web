<template>
  <div class="blank-wrap" :style="wrapStyle"></div>
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
    backgroundColor: point.bgColor,
    borderRadius: point.borderRadius.replace(/(\d+)/g, '$1px')
  })
);
</script>

<style lang="less" scoped>
.blank {
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
