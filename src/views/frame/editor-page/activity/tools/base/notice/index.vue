<template>
  <div>
    <div class="notice-content index-hidden-newline" :style="wrapStyle">
      <icon icon="icon-park-outline:volume-notice" class="mr2" />
      <div>{{ point.noticeContent }}</div>
    </div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
import { defineComponent } from 'vue';

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

// 最外层样式
const wrapStyle = computed(() => ({
  backgroundColor: point.bgColor,
  color: point.fontColor
}));
</script>

<style lang="less" scoped>
.notice-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
}
</style>
