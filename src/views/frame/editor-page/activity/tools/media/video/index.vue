<template>
  <div class="index-center-middle">
    {{ label }}
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
import { reactive, toRefs, useAttrs } from 'vue';

const attrs = useAttrs();

const { label } = toRefs(reactive<Schema>(attrs as Schema));
</script>

<style lang="less" scoped></style>
