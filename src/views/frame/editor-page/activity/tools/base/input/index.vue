<template>
  <div class="index-center-middle">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { reactive, toRefs, useAttrs } from 'vue';

const attrs = useAttrs();

const { label } = toRefs(reactive<Schema>(attrs as Schema));
</script>

<style lang="less" scoped></style>
