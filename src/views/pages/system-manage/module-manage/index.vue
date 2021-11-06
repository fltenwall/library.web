<template>
  <div class="module-manage">
    <div class="module-tree">
      <a-directory-tree
        :selected-keys="selectedKeys"
        :tree-data="menuItem"
        :show-icon="false"
        :field-names="{ key: 'name' }"
        @select="handleSelectMenu"
      />
    </div>

    <div class="module-visit">
      <div class="module-visit-header">
        <div class="pb-4 fs-5">模块权限设置</div>
        <div class="flex">
          <div class="flex-item">模块名称：{{ selected?.meta?.title }}</div>
          <div class="flex-item">模块唯一值：{{ selected?.name }}</div>
        </div>
      </div>
      <div class="module-visit-main">
        <div class="flex flex-end">
          <a-button @click="onClickNewItem">新增</a-button>
        </div>
        <div class="flex">
          <div v-for="item in dataSource" :key="item.id" class="module-auth-item">
            <div>名称：{{ item.name }}</div>
            <div class="mb-3 mt-3">
              权限项：
              <a-tag v-for="auth in item.authorities" :key="auth">{{ authorityList[auth] }}</a-tag>
            </div>
            <div class="index-operation flex flex-end">
              <!-- <span>编辑</span> -->
              <span @click="onDeleteAuth(item)">删除</span>
            </div>
          </div>
        </div>

        <module-add-modal
          v-model:visible="visible"
          :authority-list="authorityList"
          :identifier="selected?.name"
          @on-success="onAddSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu as MenuType } from '/@/router/types';
import { reactive, ref } from 'vue';
import service, { ModuleManage, Authority } from '/@/api/system-manage/module-manage';
import { getMenus, getFlatMenus } from '/@/utils/helper/menu';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';
import { queryRoleAuthority } from '/@/enums/roleEnum';
import moduleAddModal from './moduleAddModal.vue';
import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { message } from 'ant-design-vue';

interface TreeData extends MenuType {
  disabled?: boolean;

  key?: string;

  selectable?: boolean;
}

interface ModuleAuth extends Omit<ModuleManage, 'authorities'> {
  authorities?: string[];
}

// 模块数据
const menuItem: MenuType[] = reactive(initTreeData(getMenus(false)));
// 查找模块
const findMenu = (key: string) => getFlatMenus(false).find((menu) => menu.name === key);
// 选中的模块
const selectedKeys = ref<string[]>([PageEnum.BASE_HOME]);
// 选中的节点
const selected = ref(findMenu('record-manage-access-record-list-page'));
// 加载中
const loading = ref<boolean>(false);
// 数据
const dataSource = ref<ModuleAuth[]>();
// 对话框显示
const visible = ref<boolean>(false);
// 权限列表
const authorityList = ref<Authority>({});
// 新增数据
const onClickNewItem = () => (visible.value = true);

function initTreeData(source: TreeData[]): TreeData[] {
  return source.map(({ title, children, name, path }) => {
    children?.length && (children = initTreeData(children));

    return { title, children, name, path, selectable: !children?.length };
  });
}

function handleSelectMenu([key]: string[]) {
  if (!isString(key)) return;

  selectedKeys.value = [key];

  selected.value = findMenu(key);

  fetchDataFromServer();
}

// 数据解析
function dataParse(data: ModuleManage[]): ModuleAuth[] {
  return data.map((el) => {
    return {
      ...el,
      authorities: JSON.parse(el.authorities || '[]')
    };
  });
}

// 处理添加数据成功
function onAddSuccess() {
  visible.value = false;
  fetchDataFromServer();
}

// 请求数据
async function fetchDataFromServer() {
  try {
    loading.value = true;
    const query = { identifier: selected.value?.name };
    const { data } = await service.fecthList(query);
    dataSource.value = dataParse(data.content);
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}

// 获取权限列表数据
async function fetchAuthFromServer() {
  authorityList.value = await queryRoleAuthority();
}

// 删除权限
function onDeleteAuth(record: ModuleAuth) {
  useDeleteModal(async () => {
    try {
      await service.deleteItemById(record.id!);
      fetchDataFromServer();
    } catch (err) {
      message.error((err as { msg: string }).msg);
    }
  });
}

fetchDataFromServer();

fetchAuthFromServer();
</script>

<style lang="less" scoped>
.module-manage {
  display: flex;
  height: 100%;
  padding: 16px;
}

.module-tree {
  width: 280px;
  padding: 16px 0;
  background: #fff;
}

.module-visit {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 0 0 16px;

  &-header {
    padding: 16px;
    background: #fff;
  }

  &-main {
    padding: 16px;
    margin: 16px 0 0;
    background: #fff;
    flex: 1;
  }
}

.module-auth-item {
  width: calc(33.333% - 20px);
  padding: 10px;
  border: 1px solid #e5e6eb;

  &:nth-of-type(3n + 2) {
    margin: 0 10px;
  }
}
</style>
