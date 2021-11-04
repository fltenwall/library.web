<template>
  <a-popconfirm
    v-if="content.value === 'delete'"
    title="确定要删除该数据吗？"
    arrow-point-at-center
    @confirm="handleClickItem"
  >
    <span :class="content.value">{{ content.label }}</span>
  </a-popconfirm>
  <span v-else :class="content.value" @click="handleClickItem">{{ content.label }}</span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Actions } from './interface';

defineProps({
  content: {
    type: Object as PropType<Actions>,
    default: () => ({})
  }
});

const emit = defineEmits(['on-select']);

function handleClickItem() {
  emit('on-select');
}
</script>

<style lang="less" scoped>
span.delete {
  color: var(--color-error);
}
</style>
