<template>
  <div class="header-center-action">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="less" scoped>
.header-center-action {
  display: inline-flex;
  flex: 1;
}
</style>
