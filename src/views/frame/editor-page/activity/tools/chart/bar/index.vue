<template>
  <div>line</div>
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
