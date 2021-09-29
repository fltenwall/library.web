<template>
  <PublicHeader class="editor-form-header" :is-show-user-info="false">
    <template #left>
      <left-content />
    </template>
    <template #center>
      <main-content />
    </template>
    <template #right>
      <right-content />
    </template>
  </PublicHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import leftContent from './leftContent.vue';
import mainContent from './mainContent.vue';
import rightContent from './rightContent.vue';

export default defineComponent({
  components: { leftContent, mainContent, rightContent }
});
</script>

<style lang="less" scoped></style>
