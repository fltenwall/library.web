<template>
  <div class="index-center-middle">
    {{ label }}
  </div>
</template>

<script lang="ts">
import { InputSchema } from './schema';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  setup(_props, { attrs }) {
    const { label } = toRefs(reactive<InputSchema>(attrs as InputSchema));

    return { label };
  }
});
</script>

<style lang="less" scoped></style>
