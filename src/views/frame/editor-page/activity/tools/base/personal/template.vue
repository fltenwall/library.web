<template>
  <div>
    {{ dataItem }}
  </div>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { templateInit } from '../../utils';

const dataItem = templateInit<Partial<Schema>>();
</script>

<style lang="less" scoped></style>
