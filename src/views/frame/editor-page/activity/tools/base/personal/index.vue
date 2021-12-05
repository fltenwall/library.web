<template>
  <img :src="src" />
</template>

<script setup lang="ts">
// import type { Schema } from './schema';
// import { reactive, toRefs, useAttrs } from 'vue';

defineProps({
  src: {
    type: String,
    default: ''
  }
});

// const attrs = useAttrs() as unknown as Schema;

// const { src } = toRefs(reactive<Schema>(attrs));
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}
</style>
