<template>
  <div>checkbox</div>
</template>

<script setup lang="ts">
import { queryPoint } from '../../utils';

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
});

const point = queryPoint(props.id);

console.log(point);
</script>

<style lang="less" scoped></style>
