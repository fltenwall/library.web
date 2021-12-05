<template>
  <div class="table-layout index-card default-shadow">
    <div class="table-layout-header">
      <div class="table-layout-header-title"></div>
      <div>
        <a-button v-if="isNewAction" type="primary" @click="onClickAction('new')">新增</a-button>

        <a-divider v-if="isNewAction" type="vertical" />

        <tooltip-button title="刷新">
          <sync-outlined @click="handleClicRefresh" />
        </tooltip-button>
        <tooltip-button title="列设置">
          <setting-outlined />
        </tooltip-button>
      </div>
    </div>

    <!-- 表格 -->
    <global-table
      :bordered="false"
      :loading="loading"
      :scroll="{ x: true }"
      :columns="customColumns"
      :data-source="dataSource"
    >
      <template #bodyCell="data">
        <slot name="bodyCell" v-bind="data" />

        <template v-if="data.column.dataIndex === 'action' && isArray(actionsMap)">
          <div class="index-operation">
            <action-button
              v-for="item in actionsMap"
              :key="item.value"
              :value="item.value"
              @on-select="onClickAction(item.value, data.record)"
            >
              {{ item.label }}
            </action-button>
          </div>
        </template>
      </template>
    </global-table>

    <pagination-wrap v-model:current="current" class="p-4" :total="totalElements" @change="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePagination } from '/@/hooks/web/usePagination';
import { isArray } from '/@/utils/is';
import { SyncOutlined, SettingOutlined } from '@ant-design/icons-vue';
import propsOptions from './props';

const props = defineProps(propsOptions);

const emit = defineEmits(['on-instance', 'on-page-change', 'on-action', 'on-refresh']);

const dataSource = ref([]);

const totalElements = ref(0);

const actionColumns = {
  title: '操作',
  align: 'center',
  fixed: 'right',
  dataIndex: 'action',
  ellipsis: true
};

const customColumns = computed(() => {
  const columns = props.columns.map((el) => ({ align: 'center', ...el }));

  isArray(props.actions) && columns.push(actionColumns);

  return columns;
});

const actionsMap = computed(() => {
  return isArray(props.actions) && props.actions.filter((el) => (el ? el.value !== 'new' : false));
});

const isNewAction = computed(() => {
  return (isArray(props.actions) ? props.actions.findIndex((el) => el.value === 'new') : -1) !== -1;
});

const { current, setPagination, getPagination } = usePagination();

// 页面发生变化
const onPageChange = () => emit('on-page-change');

// 设置数据源
function setDataSource(data = [], total = 0) {
  dataSource.value = data;
  totalElements.value = total;
}

// 点击活动
function onClickAction(key: string, record?: { id: number }) {
  emit('on-action', key, record);
}

// 点击刷新
function handleClicRefresh() {
  emit('on-refresh');
}

emit('on-instance', { setDataSource, setPagination, getPagination });
</script>

<style lang="less" scoped>
.table-layout {
  padding: 0;
  margin: 16px;

  &-header {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 10px;
    border-bottom: 1px solid #e8e8e8;

    &-title {
      font-size: 20px;
      color: #141414;
    }
  }
}
</style>
