<template>
  <div class="module-manage">
    <!-- 菜单列表 -->
    <scrollbar class="module-tree default-shadow">
      <a-directory-tree
        :selected-keys="selectedKeys"
        :tree-data="menuItem"
        :show-icon="false"
        :field-names="{ key: 'name' }"
        @select="handleSelectMenu"
      />
    </scrollbar>

    <!-- 模块权限设置 -->
    <div class="module-visit">
      <div class="module-visit-header default-shadow">
        <div class="font-bold text-base">模块权限分配</div>
        <a-button @click="onClickNewItem">新增</a-button>
      </div>
      <!-- 操作 -->
      <div class="module-visit-main default-shadow">
        <scrollbar class="flex-item h0">
          <div v-for="item in dataSource" :key="item.id" class="module-visit-item">
            <div class="index-space-between p3">
              <div>{{ item.name }}</div>
              <dropdown-warp
                :options="options"
                @select="({ key }: { key: string }) => handleSelectActions(key,item)"
              >
                <icon icon="ant-design:ellipsis-outlined" size="20" class="module-item-ellipsis" />
              </dropdown-warp>
            </div>
            <div class="module-visit-item__main">
              <div v-for="auth in item.authorities" :key="auth" class="module-visit-item__auth">
                {{ authorityList[auth] }}
              </div>
            </div>
          </div>

          <a-empty v-if="!dataSource?.length" class="pt10" />
        </scrollbar>
        <!-- 分页 -->
        <pagination-wrap v-model:current="current" class="p4" :total="totalElements" />

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
import { usePagination } from '/@/hooks/web/usePagination';
import { queryRoleAuthority } from '/@/enums/roleEnum';
import { Scrollbar } from '/@/components/Scrollbar';
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
const selected = ref(findMenu(PageEnum.BASE_HOME));
// 加载中
const loading = ref<boolean>(false);
// 数据
const dataSource = ref<Required<ModuleAuth>[]>();
// 对话框显示
const visible = ref<boolean>(false);
// 权限列表
const authorityList = ref<Authority>({});
// 新增数据
const onClickNewItem = () => (visible.value = true);
// 分页
const { current } = usePagination();
// 总数
const totalElements = ref<number>(0);
// 下拉菜单
const options = [
  { key: 'eidt', icon: 'la:pen', content: '编辑' },
  { key: 'delete', icon: 'ant-design:delete-outlined', content: '删除' }
];

function initTreeData(source: TreeData[]): TreeData[] {
  return source.map(({ title, children, name, path }) => {
    children?.length && (children = initTreeData(children));

    return { title, children, name, path, selectable: !children?.length };
  });
}
// 处理选择菜单
function handleSelectMenu([key]: string[]) {
  if (!isString(key)) return;

  selectedKeys.value = [key];

  selected.value = findMenu(key);

  fetchDataFromServer();
}

// 处理选中 菜单
function handleSelectActions(key: string, record: Required<ModuleAuth>) {
  if (key === 'delete') {
    onDeleteAuth(record);
  }
}

// 数据解析
function dataParse(data: Required<ModuleManage>[]): Required<ModuleAuth>[] {
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
    totalElements.value = data.totalElements;
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
function onDeleteAuth(record: Required<ModuleAuth>) {
  useDeleteModal(async () => {
    try {
      await service.deleteItemById(record.id!);
      fetchDataFromServer();
    } catch (err) {
      message.error((err as { msg: string }).msg);
    }
  });
}

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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #fff;
  }

  &-main {
    display: flex;
    height: 0;
    margin: 16px 0 0;
    background: #fff;
    flex: 1;
    flex-direction: column;
  }

  &-item {
    margin: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;

    &__main {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
    }

    &__auth {
      display: inline-flex;
      padding: 5px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 20px;
    }
  }
}
</style>
