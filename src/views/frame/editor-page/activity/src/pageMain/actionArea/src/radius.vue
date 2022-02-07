<template>
  <div class="flex">
    <ui-input class="w-10 mr-1" placeholder="上左" type="number" />
    <ui-input class="w-10 mr-1" placeholder="上右" type="number" />
    <ui-input class="w-10 mr-1" placeholder="下右" type="number" />
    <ui-input class="w-10" placeholder="下左" type="number" />
  </div>
</template>

<script lang="ts" setup>
import uiInput from '/@/lib/UI/src/input/index';
</script>
