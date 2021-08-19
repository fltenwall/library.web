<template>
  <div class="breadcrumb-item">
    <span :class="['breadcrumb-item-content', isLink ? 'is-link' : '']">
      <slot />
    </span>
    <span v-if="isDivider" class="breadcrumb-item-separator">{{ separator }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    isDivider: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const parent = inject('breadcrumb') as { separator: string };

    return {
      separator: parent.separator
    };
  }
});
</script>

<style lang="less" scoped>
.breadcrumb-item {
  font-size: 14px;

  &-separator {
    margin: 0 9px;
  }

  .is-link {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.2s;
  }

  .is-link:hover {
    color: #1890ff;
  }

  &-content {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
