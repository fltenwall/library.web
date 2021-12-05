<template>
  <a-popconfirm v-if="value === 'delete'" :title="title" arrow-point-at-center @confirm="handleClickItem">
    <span :class="value"> <slot /></span>
  </a-popconfirm>
  <span v-else :class="value" @click="handleClickItem"> <slot /></span>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '确定要删除该数据吗？'
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
