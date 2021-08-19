<template>
  <a-directory-tree
    v-model:selectedKeys="selectedKeys"
    class="tree-menu"
    :show-icon="false"
    @select="onSelect"
  >
    <a-tree-node
      v-for="first in menuItem"
      :key="first.name"
      :title="first.title"
      :disabled="!!first.children?.length"
    >
      <a-tree-node
        v-for="second in first.children"
        :key="second.name"
        :title="second.title"
        :disabled="!!second.children?.length"
      >
        <a-tree-node v-for="third in second.children" :key="third.name" :title="third.title" />
      </a-tree-node>
    </a-tree-node>
  </a-directory-tree>
</template>

<script lang="ts">
import type { Menu as MenuType } from '/@/router/types';
import { defineComponent, ref } from 'vue';
import { getMenus } from '/@/utils/helper/menu';
import { PageEnum } from '/@/enums/pageEnum';

export default defineComponent({
  emits: ['on-select'],
  setup(_props, { emit }) {
    const menuItem: MenuType[] = getMenus(false);

    const selectedKeys = ref<string[]>([PageEnum.BASE_HOME]);

    // 选中的模块
    const onSelect = ([selectedKey]: string[]) => emit('on-select', selectedKey);

    return { menuItem, selectedKeys, onSelect };
  }
});
</script>

<style lang="less" scoped></style>
