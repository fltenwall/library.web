<template>
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @select="onSelect">
    <a-menu-item v-for="item in dataSource" :key="item.id">
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import type { ProblemManage } from '/@/api/basis-manage/problem-manage';
import { defineComponent, PropType, ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';

export default defineComponent({
  props: {
    dataSource: {
      type: Array as PropType<ProblemManage[]>,
      default: () => []
    }
  },
  emits: ['on-select'],
  setup(_props, { emit }) {
    // 获取当前路由
    const { currentRoute } = useRouter();

    const go = useGo();

    const selectedKeys = ref<number[]>([]);

    // 处理选中
    const onSelect = ({ key }: { key: number }) => go({ query: { id: key } }, true);

    watch(
      () => unref(currentRoute).query.id,
      (value: string) => {
        const id = Number(value);
        emit('on-select', id);
        selectedKeys.value = [id];
      },
      { immediate: true }
    );

    return { selectedKeys, onSelect };
  }
});
</script>

<style lang="less" scoped></style>
