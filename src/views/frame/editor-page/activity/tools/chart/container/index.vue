<template>
  <div class="container-wrap">{{ point.link }}</div>
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
import { reactive, useAttrs } from 'vue';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);
</script>

<style lang="less" scoped>
.button {
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
