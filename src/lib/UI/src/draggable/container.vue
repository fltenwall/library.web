<template>
  <draggable v-model="list" class="container" item-key="id" ghost-class="ghost" :group="group">
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import draggable from 'vuedraggable';

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  group: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value']);

const list = computed({
  get: () => props.value,
  set: (value) => emit('update:value', cloneDeep(value))
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
