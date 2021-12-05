<template>
  <div class="form-item-wrap">
    <a-form-item :label="label">
      <slot />
    </a-form-item>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 3
  },
  width: {
    type: String,
    default: ''
  }
});
const width = computed(() => props.width || `${100 / props.size}%`);
</script>

<style lang="less" scoped>
.form-item-wrap {
  display: inline-block;
  width: v-bind(width);
}
</style>
