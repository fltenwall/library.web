<template>
  <div class="global-card index-card default-shadow">
    <div class="card-title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
});
</script>

<style lang="less" scoped>
.global-card {
  padding: 16px 0;

  .card-title {
    margin: 0 32px 16px;
    font-size: 16px;
    font-weight: 700;
    color: #2c3a61;
  }
}
</style>
