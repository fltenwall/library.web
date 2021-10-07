<template>
  <div>radio</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { queryPoint } from '../../utils';

const props = defineProps({
  uuid: {
    type: String,
    default: ''
  }
});

const point = queryPoint(props.uuid);

console.log(point);
</script>

<style lang="less" scoped></style>
