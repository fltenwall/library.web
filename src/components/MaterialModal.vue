<template>
  <a-modal
    v-model:visible="visible"
    title="选择素材"
    width="895px"
    :style="{ top: '50px' }"
    :mask-closable="false"
  >
    <div class="flex">
      <div class="material-modal-left">
        <a-tabs>
          <!-- 我的素材 -->
          <a-tab-pane key="1" tab="我的素材">
            <scrollbar class="material-modal-main" @on-reach-bottom="handleScrollBottom">
              <div
                v-for="item in dataSource"
                :key="item.id"
                class="preview-image-wrap index-grid-image w100 h100"
                :class="selectImageMap.has(item.id) && 'preview-image-select'"
                @click="handleSelectImage(item)"
              >
                <img :src="`${MixinConfig.preview}${item.hash}`" class="preview-image" />
              </div>
            </scrollbar>
          </a-tab-pane>
          <!-- 上传素材 -->
          <a-tab-pane key="2" tab="上传素材">
            <div class="material-modal-main flex-col flex">
              <div class="ml1 mb4 mr1 flex justify-between">
                <a-upload :custom-request="handleSelectUploadImage" :show-upload-list="false">
                  <a-button>选择</a-button>
                </a-upload>
                <a-button v-if="selectImage.name" class="ml4" @click="handleUploadImage">上传</a-button>
              </div>
              <!-- 裁剪 -->
              <div class="flex-item material-modal-cropper">
                <vue-cropper
                  ref="cropperInstance"
                  output-type="png"
                  :img="selectImage.base64"
                  :auto-crop="true"
                  :center-box="true"
                />
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- 右边 -->
      <div class="material-modal-right">
        <div class="flex justify-between">
          <div class="fs4">已选中 {{ selectImageMap.size }}</div>
          <a-popconfirm title="确定清空吗？" @confirm="handleDeleteAllImage">
            <div class="flex items-center pointer">
              <icon icon="ant-design:delete-outlined" class="mr1" />清空
            </div>
          </a-popconfirm>
        </div>
        <!-- 选中图片数据 -->
        <div v-for="[key, item] in selectImageMap" :key="key" class="relative inline-flex preview-image-row">
          <div class="index-grid-image w80 h80 border-1 rounded-md inline-flex items-center m2">
            <img :src="`${MixinConfig.preview}${item.hash}`" class="preview-image full-height" />
          </div>
          <icon
            class="preview-image-close"
            icon="ant-design:close-circle-filled"
            @click="handleSelectImage(item)"
          />
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->

    <template #footer>
      <div class="index-center">
        <a-button @click="visible = false">取消</a-button>
        <a-button type="primary" @click="handleClickConfirm">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, computed, unref, watch } from 'vue';
import { message } from 'ant-design-vue';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { concat } from 'lodash';
import { Scrollbar } from '/@/components/Scrollbar';
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { base64ToFile, fileToBase64 } from '/@/utils/file';
import imageUploader from '/@/utils/imageUploader';
import { isNull, isNumber, isUndefined } from '../utils/is';
import { usePagination } from '/@/hooks/web/usePagination';

interface CropperInstance {
  getCropData?: (cb: (data: string) => void) => void;
}

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  dictType: {
    type: String,
    default: '',
    required: true
  },
  dictValue: {
    type: String,
    default: '',
    required: true
  },
  maxlength: {
    type: Number,
    default: undefined
  }
});

const emit = defineEmits(['update:value', 'select']);
// 加载数据
const loading = ref<boolean>(false);
// 数据列表
const dataSource = ref<Required<ImageManage>[]>([]);
// 上传数据信息
const selectImage = reactive<{ name?: string; base64?: string }>({});
// 图片裁剪实例
const cropperInstance = ref<CropperInstance | null>(null);
// 上传
const selectUploadImages = imageUploader();
// 选中图片列表
const selectImageMap = ref<Map<number, Required<ImageManage>>>(new Map());
// 显示
const visible = computed({ get: () => props.value, set: (val) => emit('update:value', val) });
// 分页
const { current, pageSize, getPagination } = usePagination(1, 20);
// 总数
const totalElements = ref<number>(0);
// 获取服务器数据
async function fetchDataFromServer() {
  try {
    loading.value = true;
    const query = queryData();
    const { data } = await service.fecthImageListByDict(query);
    current.value === 1 && (dataSource.value = []);
    dataSource.value = concat(unref(dataSource), unref(data.content));
    totalElements.value = data.totalElements;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}
// 数据查询
function queryData() {
  return {
    ...getPagination(),
    type: props.dictType,
    value: props.dictValue,
    sort: 'createTime,desc'
  };
}

// 选择文件
async function handleSelectUploadImage({ file }: { file: File }) {
  const base64 = await fileToBase64(file);

  setSelectImage({ name: file.name, base64 });
}

// 选中图片
function handleSelectImage(record: Required<ImageManage>) {
  if (selectImageMap.value.has(record.id)) {
    selectImageMap.value.delete(record.id);
  } else if (
    (isNumber(props.maxlength) && selectImageMap.value.size < props.maxlength) ||
    isUndefined(props.maxlength)
  ) {
    selectImageMap.value.set(record.id, record);
  } else {
    message.destroy();
    message.warn(`最多只能选中 ${props.maxlength} 张素材`);
  }
}

// 设置选中图片数据
function setSelectImage({ name, base64 }: { name: string; base64: string }) {
  selectImage.name = name;
  selectImage.base64 = base64;
}

// 上传文件
async function handleUploadImage() {
  if (!selectImage.base64) return;

  const base64 = await getCropData();

  const file = base64ToFile(base64, selectImage.name);

  if (isNull(file)) return;

  try {
    message.loading('1 个文件上传中...', 0);
    await selectUploadImages([file], { value: props.dictValue, type: props.dictType });
    message.destroy();
    message.success('上传成功');
    setSelectImage({ name: '', base64: '' });
    // 上传重置数据
    current.value = 1;
    fetchDataFromServer();
  } catch (err) {
    message.destroy();
    // 上传失败
    message.error((err as { msg: string }).msg);
  }
}
// 滚动加载数据
function handleScrollBottom() {
  if (unref(current) * unref(pageSize) < unref(totalElements) && !unref(loading)) {
    // 滚动加载分页数据
    current.value += 1;

    fetchDataFromServer();
  }
}

// 获取裁剪图片数据
function getCropData(): Promise<string> {
  return new Promise((resolve) => {
    cropperInstance.value?.getCropData?.((data) => {
      resolve(data);
    });
  });
}

// 处理删除全部图片
function handleDeleteAllImage() {
  selectImageMap.value.clear();
}

// 处理点击确定
function handleClickConfirm() {
  emit(
    'select',
    [...selectImageMap.value.values()].map((el) => unref(el))
  );

  visible.value = false;
}

// 清空数据
watch(
  () => visible.value,
  () => handleDeleteAllImage()
);

fetchDataFromServer();
</script>

<style lang="less" scoped>
.material-modal {
  &-left {
    flex: 1;
    margin-right: 24px;
  }

  &-right {
    width: 350px;
    padding: 16px 24px 16px 16px;
    font-family: PingFang SC, Helvetica Neue, Helvetica, Microsoft JhengHei, Microsoft YaHei, Arial,
      'sans-serif';
    background: #f5f6f8;
  }

  &-main {
    height: 440px;
  }
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  pointer-events: none;

  &-wrap {
    display: inline-flex;
    margin: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 6px;
    user-select: none;

    &:hover {
      border-color: #2c63ff;

      .preview-image-close {
        opacity: 0;
      }
    }
  }

  &-select {
    border-color: #2c63ff;
  }

  &-close {
    position: absolute;
    right: -5px;
    font-size: 20px;
    color: #a1a1aa;
    cursor: pointer;
    opacity: 0;

    &:hover {
      color: #d4d4d8;
    }
  }

  &-row {
    user-select: none;

    &:hover {
      .preview-image-close {
        opacity: 1;
      }
    }
  }
}
</style>
