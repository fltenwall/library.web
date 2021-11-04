<template>
  <div></div>
  <!-- <div class="pb-4 pr-4 pl-4 module-manage">
    <scrollbar class="bg-white default-shadow flex-shrink-0">
      <module-tree class="tree-menu" @on-select="handleSelect" />
    </scrollbar>
    <div class="flex-item pl-4 index-column">
      <div class="bg-white p-4 default-shadow">
        <div class="fw-b fs-4 pb-4">
          {{ selectMenu!.meta!.title }}
        </div>
        <global-table
          bordered
          :columns="tableColumns"
          :data-source="[selectMenu]"
          :row-key="'name'"
        />
      </div>
      <module-visit :identifier="selectMenu!.name" />
    </div>
  </div> -->
</template>

<script lang="ts">
import type { FlatMenu } from '/@/router/types';
import { defineComponent, ref } from 'vue';
// import { Scrollbar } from '/@/components/Scrollbar';
import { getFlatMenus } from '/@/utils/helper/menu';
import { PageEnum } from '/@/enums/pageEnum';
// import moduleTree from './module-tree.vue';
// import moduleVisit from './module-visit.vue';
import { tableColumns } from './index';

export default defineComponent({
  // components: { moduleTree, Scrollbar, moduleVisit },
  setup() {
    // 查找菜单
    const findMenu = (key: string) => getFlatMenus(false).find((menu) => menu.name === key);

    // 选中
    const selectMenu = ref<FlatMenu | undefined>(findMenu(PageEnum.BASE_HOME));

    function handleSelect(selectedKey: string) {
      selectMenu.value = findMenu(selectedKey);
    }

    return {
      tableColumns,
      handleSelect,
      selectMenu
    };
  }
});
</script>

<style lang="less" scoped>
.module-manage {
  display: flex;
  height: 100%;

  .tree-menu {
    flex: 1;
    flex-shrink: 0;
    width: 280px;
    height: 0;
    padding: 16px 16px 16px 8px;
    border-radius: var(--public-order-radius);
  }
}
</style>
