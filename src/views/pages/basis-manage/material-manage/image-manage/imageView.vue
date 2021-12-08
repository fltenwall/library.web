<template>
  <div ref="imageView" class="image-view default-shadow">
    <div class="image-view-header index-middle">
      <div>{{ selected.label || '全部' }}</div>
      <div class="flex">
        <a-input placeholder="查询" />
        <a-button class="mr-3 ml-3">查询</a-button>
        <upload
          :disabled="!selected.id"
          :data="{ classifyId: selected.id }"
          :before-upload="handleBeforeUpload"
          @upload-success="handleUploadSuccess"
        >
          <a-button>上传</a-button>
        </upload>
      </div>
    </div>
    <!-- 图片 -->
    <scrollbar class="image-main">
      <div class="image-item-list">
        <div v-for="item in dataSource" :key="item.id" class="image-item-card">
          <img :src="`${MixinConfig.preview}${item.hash}`" class="preview-image" />
          <div class="image-item-card-content">
            <div class="index-hidden-newline">
              <span class="card-row__title">名称</span>
              <span class="card-row__content">{{ item.name }}</span>
            </div>
            <div>
              <span class="card-row__title">类型</span>
              <span class="card-row__content">{{ item.type.replace('image/', '').toLocaleUpperCase() }}</span>
            </div>
            <div>
              <span class="card-row__title">大小</span>
              <span class="card-row__content">{{ fileSize(item.size) }}</span>
            </div>
            <div class="index-middle flex-space-between">
              <div>
                <span class="card-row__title">创建于</span>
                <span class="card-row__content">{{ useMoment(item.createTime) }}</span>
              </div>
              <icon
                icon="ant-design:ellipsis-outlined"
                class="card-row__button"
                @click="handleimageItemSetting(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 空数据 -->
      <a-empty v-if="!dataSource.length && !loading" />
    </scrollbar>
    <!-- 分页 -->
    <pagination-wrap
      v-model:current="current"
      class="pt-4"
      :page-size="pageSize"
      :total="totalElements"
      @change="fetchDataFromServer"
    />
    <!-- 对话框 -->
    <image-view-modal
      v-model:visible="visible"
      :image-data="dataItem"
      :options="options"
      @on-success="fetchDataFromServer"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { DictionaryDetail } from '/@/api/basis-manage/dictionary-detail';
import { ref, computed, reactive, watch } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { usePagination } from '/@/hooks/web/usePagination';
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { useMoment } from '/@/utils/dateFormat';
import { message } from 'ant-design-vue';
import { assign, cloneDeep } from 'lodash';
import { Upload } from '/@/lib/UI/index';
import { isNumber } from '/@/utils/is';
import imageViewModal from './imageViewModal.vue';

const props = defineProps({
  selected: {
    type: Object as PropType<DictionaryDetail>,
    default: () => ({})
  },
  menuData: {
    type: Array as PropType<Required<DictionaryDetail>[]>,
    default: () => []
  }
});
const imageView = ref<HTMLNULL>(null);
// 数据源
const dataSource = ref<Required<ImageManage>[]>([]);
// 总数
const totalElements = ref<number>(0);
// 加载
const loading = ref<boolean>(true);
// 对话框是否显示
const visible = ref<boolean>(false);
// 下拉菜单
const options = computed(() => props.menuData.map(({ label, id }) => ({ value: id, label })));
// 选中的数据
const dataItem = reactive<ImageManage>({});
// 分页
const { current, pageSize, getPagination } = usePagination(1, 12);

// 获取服务器数据
async function fetchDataFromServer() {
  try {
    const query = queryData();
    const { data } = await service.fecthImageList(query);
    dataSource.value = data.content;
    totalElements.value = data.totalElements;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}

// 获取查询的数据
function queryData() {
  return {
    ...getPagination(),
    sort: 'createTime,desc',
    classifyId: props.selected.id || ''
  };
}

// 文件上传
async function handleBeforeUpload() {
  return isNumber(props.selected.id);
}

// 文件大小
function fileSize(size: number) {
  return (((size / 1024) | 0) + ' KB').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 处理照片编辑
function handleimageItemSetting(record: Required<ImageManage>) {
  assign(dataItem, cloneDeep(record));
  visible.value = true;
}

// 处理图片上传成功
function handleUploadSuccess() {
  message.success(`文件上传成功，已保存至【${props.selected.label}】`);

  fetchDataFromServer();
}

watch(
  () => props.selected.id,
  () => {
    current.value = 1;
    fetchDataFromServer();
  }
);

fetchDataFromServer();
</script>

<style lang="less" scoped>
@itemBorder: 1px solid #e5e6eb;

.image-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #fff;

  &-header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 16px;
  }
}

.image-main {
  flex: 1;
  height: 0;
}

.image-item-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item-card {
  display: inline-flex;
  width: calc(33.333% - 5px);
  height: 150px;
  padding: 10px;
  margin: 0 0 15px 0;
  border: @itemBorder;

  &:nth-of-type(3n + 2) {
    margin-right: 7.5px;
    margin-left: 7.5px;
  }

  ::v-deep(.preview-image) {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }

  &-content {
    display: flex;
    width: 0;
    margin: 0 0 0 10px;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-operation {
    & > span {
      min-width: 30px;
    }
  }

  .card-row {
    &__title {
      display: inline-block;
      width: 45px;
      text-align-last: justify;
    }

    &__content {
      &::before {
        margin: 0 10px 0 3px;
        content: ':';
      }
    }

    &__button {
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  }

  &:hover {
    box-shadow: 0 2px 8px #00000026;

    .card-row {
      &__button {
        opacity: 1;
      }
    }
  }
}

@media screen and (max-width: 1550px) {
  .image-item-card {
    width: calc(50% - 5px);

    &:nth-of-type(3n + 2) {
      margin-right: 0;
      margin-left: 0;
    }

    &:nth-of-type(2n + 1) {
      margin-right: 10px;
    }
  }
}

@media screen and (max-width: 1450px) {
  .image-item-card {
    width: 100%;

    &:nth-of-type(2n + 1) {
      margin-right: 0;
    }
  }
}
</style>
