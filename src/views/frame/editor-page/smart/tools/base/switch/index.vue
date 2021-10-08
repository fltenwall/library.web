<template>
  <div>switch</div>
</template>

<script setup lang="ts">
import { queryPoint } from '../../utils';

const props = defineProps({
  uuid: {
    type: String,
    default: ''
  }
});
// 拖拽信息数据
const point = queryPoint(props.uuid);

console.log(point);
</script>

<style lang="less" scoped></style>
