<template>
  <a-dropdown>
    <slot />
    <template #overlay>
      <a-menu @click="handleSelect">
        <a-menu-item v-for="item in options" :key="item.key">
          <div class="index-middle">
            <icon :icon="item.icon" />
            <div class="ml4">{{ item.content }}</div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  options: {
    type: Array as PropType<{ icon: string; content: string; key: string }[]>,
    default: () => []
  }
});

const emits = defineEmits(['select']);

function handleSelect({ key }: { key: string }) {
  emits('select', { key });
}
</script>
