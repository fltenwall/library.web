<template>
  <div ref="visitRef" class="image-list flex flex-column">
    <GlobalTable
      :scroll="scroll"
      :columns="tableColumns"
      :loading="loading"
      :data-source="dataSource"
    >
      <template #name="{ record }">
        <input
          v-model="record.name"
          class="input-name"
          :title="record.name"
          @focus="handleImageEditorBefore(record)"
          @blur="handleImageEditorAfter(record)"
        />
      </template>
      <template #image="{ record }">
        <a-image :src="MixinConfig.preview + record.hash" class="preview-image" />
      </template>
      <template #updateTime="{ record }">
        {{ useMoment(record.createTime) }}
      </template>
      <template #size="{ record }">
        {{ (((record.size / 1024) | 0) + ' KB').replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
      </template>

      <template #operation="{ record }">
        <div class="index-operation">
          <span @click="onDeleteDataItem(record)">删除</span>
        </div>
      </template>
    </GlobalTable>

    <div class="image-list-footer">
      <PaginationWrap :total="totalElements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, unref, PropType, toRefs, reactive } from 'vue';
import { usePagination } from '/@/hooks/web/usePagination';
import { useMoment } from '/@/utils/dateFormat';
import { tableColumns } from './image-list';
import service, { Classify, ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { message } from 'ant-design-vue';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';

export default defineComponent({
  props: {
    classify: {
      // 分组
      type: Object as PropType<Required<Classify>>,
      default: () => ({})
    }
  },
  setup(props) {
    const { classify } = toRefs(props);
    // 选中的数据
    const selectData = ref<ImageManage>({});
    // 获取分页
    const pagination = usePagination();
    // 列表数据
    const dataSource = ref<ImageManage[]>([]);
    // 总数
    const totalElements = ref<number>(0);
    // 加载中
    const loading = ref<boolean>(false);
    // 视图
    const visitRef = ref<HTMLElement | null>(null);

    const scroll = reactive<{ y?: number }>({});
    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      try {
        const query = queryData();
        loading.value = true;
        const { data } = await service.fecthImageList(query);
        dataSource.value = data.content;
        totalElements.value = data.totalElements;
      } catch (err) {
        message.error(`数据获取失败: ${err.msg}`);
      } finally {
        loading.value = false;
      }
    }

    // 获取查询的数据
    function queryData() {
      return {
        ...pagination.getPagination(),
        sort: 'createTime,desc',
        classifyId: unref(classify).id || ''
      };
    }

    // 处理照片名称修改之前
    function handleImageEditorBefore(record: Required<ImageManage>) {
      selectData.value.name = record.name;
    }

    // 处理照片名称修改之后
    async function handleImageEditorAfter(record: Required<ImageManage>) {
      if (!record.name || record.name === unref(selectData).name!) {
        record.name = unref(selectData).name!;
        return;
      }
      try {
        loading.value = true;
        await service.updateImage(record.id, { name: record.name });
        loading.value = false;
        fetchDataFromServer();
      } catch (err) {
        message.error(`数据更新失败: ${err.msg}`);
        record.name = unref(selectData).name!;
      }
    }

    // 删除数据
    async function onDeleteDataItem(record: ImageManage) {
      useDeleteModal(async () => {
        await service.deleteImageById(record.id!);
        fetchDataFromServer();
      });
    }

    // 分组id变化重新请求数据
    watch(
      () => classify.value,
      () => fetchDataFromServer(),
      { immediate: true }
    );

    setTimeout(() => {
      scroll.y = (visitRef.value?.offsetHeight as number) - 102;
    }, 0);

    return {
      scroll,
      loading,
      visitRef,
      dataSource,
      totalElements,
      ...pagination,
      tableColumns,
      useMoment,
      onDeleteDataItem,
      fetchDataFromServer,
      handleImageEditorAfter,
      handleImageEditorBefore
    };
  }
});
</script>

<style lang="less" scoped>
.image-list {
  height: 100%;

  .picture-selet__content-item {
    &.select {
      background: #1d39c422;
      border: 1px solid #1d39c4;
      border-radius: 2px;
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }
}

::v-deep(.preview-image) {
  width: 100px;
  height: 50px;
  object-fit: cover;
}

.input-name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  background: transparent;
  border-width: 0;
  outline: none;
}
</style>
