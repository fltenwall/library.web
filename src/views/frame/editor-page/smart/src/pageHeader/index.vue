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

<script setup lang="ts">
import leftContent from './leftContent.vue';
import mainContent from './mainContent.vue';
import rightContent from './rightContent.vue';
</script>

<style lang="less" scoped></style>
