<template>
  <scrollbar class="tree-menu default-shadow">
    <template v-if="finished">
      <a-directory-tree
        v-model:checkedKeys="checked"
        checkable
        class="tree-menu"
        :disabled="readonly"
        :selected-keys="[]"
        :tree-data="treeData"
        :show-icon="false"
        :field-names="{ key: 'name' }"
        @check="handleMenuCheck"
      />
    </template>
  </scrollbar>
</template>

<script lang="ts" setup>
import type { Menu as MenuType } from '/@/router/types';
import { ref, watch } from 'vue';
import { getMenus } from '/@/utils/helper/menu';
import { Scrollbar } from '/@/components/Scrollbar';
import service, { ModuleManage } from '/@/api/system-manage/module-manage';
import { message } from 'ant-design-vue';
import { PageMode } from '/@/utils/helper/breadcrumb';

interface TreeData extends MenuType {
  // 将树禁用
  disabled?: boolean;
  // 标题
  title?: string;
}

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  mode: {
    type: Number,
    default: undefined
  }
});

const emit = defineEmits(['update:value']);

// 编辑选中的数据
let modularIds: number[] = [];
// 是否内部更新数据
let isValueUpdateFromInner = false;
// 菜单数据
let moudleData: Required<ModuleManage>[] = [];
// 加载中
const loading = ref<boolean>(false);
// 加载完成
const finished = ref<boolean>(props.mode === PageMode.new);
// 树形菜单
const treeData = ref<MenuType[]>(buildTreeData(getMenus(false)));
// 选中的数据
const checked = ref<string[]>([]);

// 请求服务器数据
async function fetchDataFromServer() {
  try {
    loading.value = true;
    const { data } = await service.fecthList({ size: 1000 });
    moudleData = data.content;
    treeData.value = buildTreeData(getMenus(false));
    finished.value = true;
  } catch (err) {
    message.error(`数据加载失败: ${err}`);
  } finally {
    loading.value = false;
  }
}

// 建造 树数据
function buildTreeData(source: TreeData[]): TreeData[] {
  const target: TreeData[] = [];

  source.forEach((el) => {
    if (el.children) {
      el.children = buildTreeData(el.children);
    } else {
      const authData = moudleData.filter(({ identifier }) => identifier === el.name);
      el.children = authData.map(({ id, name: title }) => ({ path: '', name: `${id}`, title }));
      authData.forEach(({ id }) => modularIds.includes(id!) && checked.value.push(`${id}`));
    }
    const result = el.children.every((child) => modularIds.includes(Number(child.name)));

    el.children.length && result && checked.value.push(el.name as string);

    target.push(el);
  });

  return target;
}
// 点击复选框触发
function handleMenuCheck() {
  // 获取勾选数据 id
  const data = moudleData.filter(({ id }) => checked.value.includes(`${id}`)).map(({ id }) => id);

  isValueUpdateFromInner = true;

  emit('update:value', JSON.stringify(data));
}

watch(
  () => props.value,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      // 数据变化重新解析数据
      modularIds = JSON.parse(props.value || '[]');
      // 不同数据获取
      fetchDataFromServer();
    }
  },
  { immediate: props.mode === PageMode.new }
);
</script>

<style lang="less" scoped>
.tree-menu {
  height: 500px;
  background: var(--theme-background);
  border-radius: var(--public-order-radius);
}
</style>
