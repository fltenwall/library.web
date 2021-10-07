<template>
  <a-pagination
    :current="current"
    :page-size="pageSize"
    :show-total="(total) => `共 ${total} 条`"
    :total="total"
    @change="onPageChange"
    @showSizeChange="onSizeChange"
  />
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    current: {
      type: Number as PropType<number>,
      default: 1
    },
    pageSize: {
      type: Number as PropType<number>,
      default: undefined
    },
    total: {
      type: Number as PropType<number>,
      default: undefined
    }
  },
  emits: ['update:current', 'update:pageSize', 'change', 'showSizeChange'],
  setup(_props, { emit }) {
    function onPageChange(page: number, size: number) {
      emit('update:current', page);
      emit('change', page, size);
    }

    function onSizeChange(page: number, size: number) {
      emit('update:pageSize', size);
      emit('showSizeChange', page, size);
    }

    return {
      onPageChange,
      onSizeChange
    };
  }
});
</script>

<style lang="less" scoped>
.input-wrap[disabled] {
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
}
</style>
