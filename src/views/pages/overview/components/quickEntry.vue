<template>
  <div class="quick-entry">
    <card-header>
      <template #left> 快捷操作 </template>
    </card-header>

    <div class="quick-entry-main">
      <a-dropdown
        v-for="(item, index) in dataSources"
        :key="index"
        class="quick-entry-item"
        placement="bottomCenter"
      >
        <div @click="handleClickEnter(item.link)" @contextmenu.prevent>
          {{ item.name }}
        </div>
        <template #overlay>
          <a-menu @click="handleMenuClick($event, item)">
            <a-menu-item key="edit"> 编 辑 </a-menu-item>
            <a-menu-item key="delete"> 删 除 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button class="quick-entry-item" type="primary" size="small" @click="handleNewEntry">
        添加
      </a-button>
      <loading-outlined v-if="loading" class="load-icon" />
    </div>
  </div>

  <quick-entry-modal
    v-model:visible="modal.visible"
    :title="modal.title"
    :quick-data="modal.data"
    @on-success="onModalSuccess"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import quickEntryModal from './quickEntryModal.vue';
import service, { Quick } from '/@/api/quick';
import cardHeader from './cardHeader';
import { useGo } from '/@/hooks/web/usePage';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';

interface Modal {
  // 标题
  title?: string;
  // 隐藏/显示
  visible: boolean;
  // 数据集
  data: Quick;
}

export default defineComponent({
  components: { cardHeader, quickEntryModal },
  setup() {
    const dataSources = ref<Quick[]>([]);

    const go = useGo();

    // 对话框
    const modal = reactive<Modal>({ visible: false, data: {}, title: '' });

    const loading = ref<boolean>(false);

    // 对话框返回成功
    const onModalSuccess = () => fetchDataFromServer();

    // 处理添加新的快捷方式
    function handleNewEntry() {
      modal.title = '添加快捷操作';
      modal.visible = true;
      modal.data = {};
    }

    // 处理点击模块
    function handleClickEnter(name: string) {
      go({ name });
    }

    // 处理菜单点击
    function handleMenuClick({ key }: { key: string }, record: Quick) {
      if (key === 'edit') {
        modal.title = '编辑快捷操作';
        modal.visible = true;
        modal.data = record;
      } else if (key === 'delete') {
        useDeleteModal(async () => {
          await service.deleteItemById(record.id!);
          fetchDataFromServer();
        });
      }
    }

    // 从服务器获取数据
    async function fetchDataFromServer() {
      try {
        loading.value = true;
        const { data } = await service.fecthList();
        dataSources.value = data.content;
      } catch (err) {
      } finally {
        loading.value = false;
      }
    }

    fetchDataFromServer();

    return {
      loading,
      dataSources,
      modal,
      handleNewEntry,
      handleClickEnter,
      handleMenuClick,
      onModalSuccess
    };
  }
});
</script>

<style lang="less" scoped>
.quick-entry {
  display: flex;
  flex-direction: column;
  height: 348px;
  background: var(--color-background-override);

  &-main {
    flex: 1;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 10px;
  }

  &-item {
    margin: 10px;
    cursor: pointer;

    &:hover {
      color: @primary-hover-color;
    }
  }
}

.load-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
  color: #1890ff;
  transform: translate(-50%, -50%);
}
</style>
