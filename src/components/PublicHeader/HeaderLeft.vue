<template>
  <div class="header-left-action">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.header-left-action {
  display: inline-flex;
  align-items: center;
}
</style>
