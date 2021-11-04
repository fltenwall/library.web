<template>
  <div ref="imageView" class="image-view default-shadow">
    <div class="image-view-header index-middle">
      <div>{{ selected.title || '全部' }}</div>
      <div class="flex">
        <a-input placeholder="查询" />
        <a-button class="mr-3 ml-3">查询</a-button>
        <upload :disabled="!!selected.id" @on-change="handleFileChange">
          <a-button>上传</a-button>
        </upload>
      </div>
    </div>
    <scrollbar class="image-main">
      <div
        v-for="(item, index) in dataSource"
        :key="item.id"
        class="image-item"
        :style="{ marginRight: (index + 1) % colSize === 0 ? '' : '15px' }"
      >
        <a-image :src="`${MixinConfig.preview}${item.hash}`" class="preview-image" />
        <div class="image-item-content">
          <div class="index-hidden-newline">名称：{{ item.name }}</div>
          <div>类型：{{ item.type }}</div>
          <div>大小：{{ fileSize(item.size) }}</div>
          <div class="index-middle flex-space-between">
            <div>创建于：{{ useMoment(item.createTime, 'YYYY年MM月DD日') }}</div>
            <div class="index-operation item-operation">
              <span @click="handleimageItemEdit(item)">编辑</span>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
    </scrollbar>

    <pagination-wrap class="pt-4" v-model:current="current" :total="totalElements" />

    <!-- 对话框 -->
    <a-modal
      v-model:visible="visible"
      title="编辑"
      width="400px"
      :confirm-loading="saveLoading"
      @ok="handleSaveItem"
    >
      <a-form :rules="rules">
        <a-form-item label="分类" v-bind="validateInfos.classifyId">
          <a-select v-model:value="dataItem.classifyId" :options="options" disabled />
        </a-form-item>
        <a-form-item label="名称" v-bind="validateInfos.name">
          <a-input v-model:value="dataItem.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { usePagination } from '/@/hooks/web/usePagination';
import service, { Classify, ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { useMoment } from '/@/utils/dateFormat';
import { message, Form } from 'ant-design-vue';
import { imageUploader } from './data-list';
import { assign, cloneDeep } from 'lodash';
import { Upload } from '/@/lib/UI/index';
import { isString } from '/@/utils/is';

const useForm = Form.useForm;

const props = defineProps({
  selected: {
    type: Object as PropType<Classify>,
    default: () => ({})
  },
  menuData: {
    type: Array as PropType<Required<Classify>[]>,
    default: () => []
  }
});
const imageView = ref<HTMLNULL>(null);
// 个数
const colSize = ref<number>(0);
// 数据源
const dataSource = ref<Required<ImageManage>[]>([]);
// 总数
const totalElements = ref<number>(0);
// 加载
const loading = ref<boolean>(false);
// 对话框是否显示
const visible = ref<boolean>(false);
// 保存加载
const saveLoading = ref<boolean>(false);
// 下拉菜单
const options = computed(() =>
  props.menuData.map(({ title, id }) => ({ value: id, label: title }))
);
// 选中的数据
const dataItem = reactive<ImageManage>({});
// 添加规则
const rules = reactive({
  name: [{ required: true, message: '不允许为空' }],
  classifyId: [{ required: true, message: '不允许为空' }]
});
// 获取表单规则
const { validateInfos } = useForm(dataItem, rules);
// 分页
const { current, getPagination } = usePagination();

const selectUploadImages = imageUploader();

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
async function handleFileChange(files: File[]) {
  if (!isString(props.selected.id)) return;
  // 设置上传数据
  await selectUploadImages(files, props.selected.id);
  loading.value = false;
  // 刷新数据
  fetchDataFromServer();
}

// 文件大小
function fileSize(size: number) {
  return (((size / 1024) | 0) + ' KB').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 处理照片编辑
function handleimageItemEdit(record: Required<ImageManage>) {
  assign(dataItem, cloneDeep(record));
  visible.value = true;
}

// 处理保存数据
async function handleSaveItem() {
  try {
    if (saveLoading.value) return;

    saveLoading.value = true;
    // 设置上传数据
    await service.updateImage(dataItem.id!, { name: dataItem.name! });

    fetchDataFromServer();

    visible.value = false;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.selected.id,
  () => fetchDataFromServer()
);

// 初始化
onMounted(() => {
  colSize.value = ((imageView.value?.offsetWidth || 0) / 425) | 0;
});

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

.image-item {
  display: inline-flex;
  width: 425px;
  height: 150px;
  padding: 10px;
  margin: 0 0 15px 0;
  border: @itemBorder;

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
}
</style>
