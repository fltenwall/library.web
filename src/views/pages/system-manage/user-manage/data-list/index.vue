<template>
  <page-layout
    title="用户列表"
    :name="DATA_PAGE_NAME"
    :table-actions="actions"
    :table-columns="tableColumns"
    :search-options="searchOptions"
    :on-fetch-data="fetchDataFromServer"
    :on-delete-data="deleteDataFromServer"
    @on-action="handleClickAction"
  >
    <template #tableBodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'username'">
        <div class="index-middle">
          <a-badge :count="record.superAdmin ? '超' : ''">
            <a-avatar shape="square" :size="32">
              <template #icon>
                <user-outlined />
              </template>
            </a-avatar>
          </a-badge>
          <div class="ml5">
            <div class="font-600 mb1">{{ record.username }}</div>
            <div class="text-gray-400">{{ record.email || record.mobile }}</div>
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'updateTime'">{{ useFromatlll(record.createTime) }}</template>
      <template v-else-if="column.dataIndex === 'enabled'">
        <a-tag :color="record.enabled ? '#4f46e5' : '#52525b'">
          {{ record.enabled ? '使用中' : '禁用中' }}
        </a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'role'">{{ record.role.name }}</template>
      <template v-else-if="column.dataIndex === 'binding'"> </template>
    </template>
  </page-layout>

  <password-modal
    v-model:value="modalData.visible"
    title="密码重置"
    :loading="modalData.loading"
    @on-confirm="handleUpdatePassword"
  />
</template>

<script setup lang="ts">
import type { TableColumn } from '/@/lib/props/TableList';
import { reactive } from 'vue';
import service, { UserManage } from '/@/api/system-manage/user-manage';
import { SearchOptions } from '/@/components/PageLayout/SearchLayout/interface';
import { showByAuth } from '/@/hooks/web/useAuthorities';
import { PagerQueryData } from '/@/lib/http/axios/types';
import { useFromatlll } from '/@/utils/dateFormat';
import { message } from 'ant-design-vue';
import md5 from '/@/utils/encryption/md5';
import passwordModal from '/@/components/passwordModal.vue';

const DATA_PAGE_NAME = 'system-manage-user-manage-data-page';

const actions = [
  showByAuth('USER:CREATE') && { label: '新增', value: 'new' },
  { label: '查看', value: 'view' },
  showByAuth('USER:UPDATE') && { label: '编辑', value: 'edit' },
  showByAuth('USERPASSWORD:UPDATE') && { label: '重置密码', value: 'reset' },
  showByAuth('USER:DELETE') && { label: '删除', value: 'delete' }
];

// 对话框
const modalData = reactive({ visible: false, id: -1, loading: false });

// 从服务器取得数据 设置列表数据 禁止直接调用 刷新数据通过 onFetchData
async function fetchDataFromServer(query: PagerQueryData) {
  const { data } = await service.fecthList(query);

  return data;
}

// 删除数据, 刷新数据
async function deleteDataFromServer(id: number) {
  await service.deleteItemById(id);
}

// 处理操作点击
function handleClickAction(key: string, record: Required<UserManage>) {
  if (key === 'reset') {
    openPasswordModal(record);
  }
}

// 打开对话框
function openPasswordModal({ id }: Required<UserManage>) {
  modalData.visible = true;
  modalData.id = id;
}

// 密码修改
async function handleUpdatePassword(password: string) {
  try {
    modalData.loading = true;
    await service.updatePassword(modalData.id, md5(password));
    message.success('重置成功');
    modalData.visible = false;
  } catch (err) {
    message.error(`重置失败: ${(err as unknown as { msg: string }).msg}`);
  } finally {
    modalData.loading = false;
  }
}

const searchOptions: SearchOptions[] = [
  {
    key: 'username',
    component: 'inputSearch',
    label: '登录账户'
  },
  {
    key: 'email',
    component: 'inputSearch',
    label: '邮件地址'
  },
  {
    key: 'mobile',
    component: 'inputSearch',
    label: '手机号码'
  },
  {
    key: 'nickname',
    component: 'inputSearch',
    label: '用户名称'
  },
  {
    key: 'nickname',
    component: 'inputSearch',
    label: '用户名称'
  }
];

const tableColumns: TableColumn[] = [
  {
    title: '登录账户',
    dataIndex: 'username',
    ellipsis: true,
    align: 'left'
  },
  {
    title: '用户状态',
    dataIndex: 'enabled',
    ellipsis: true
  },
  {
    title: '用户名称',
    dataIndex: 'nickname',
    ellipsis: true
  },
  {
    title: '角色',
    dataIndex: 'role',
    ellipsis: true
  },
  {
    title: '性别',
    dataIndex: ['sex', 'label'],
    ellipsis: true
  },
  {
    title: '账户绑定',
    dataIndex: 'binding',
    ellipsis: true
  }
];
</script>

<style lang="less" scoped></style>
