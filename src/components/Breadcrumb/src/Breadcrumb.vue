<template>
  <div class="breadcrumb index-middle">
    <slot />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, provide } from 'vue';

export default defineComponent({
  props: {
    separator: {
      type: String as PropType<string>,
      default: '/'
    }
  },
  setup(props) {
    provide('breadcrumb', props);
  }
});
</script>

<style></style>
