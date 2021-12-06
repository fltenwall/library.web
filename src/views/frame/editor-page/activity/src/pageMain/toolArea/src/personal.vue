<template>
  <div class="personal-wrap">
    <div class="personal__header">我的素材</div>
    <div class="personal__actions">
      <select-wrap v-model:value="selectType" :options="options" class="w-140" placeholder="操作方式" />
      <upload :data="{ value: DICT_VALUE, type: DICT_TYPE }" @upload-success="handleUploadSuccess">
        <a-button>上传</a-button>
      </upload>
    </div>
    <scrollbar>
      <div class="personal__content">
        <!-- 空数据 -->
        <a-empty v-if="isEmpty" :image="simpleImage" />
        <!-- 内容 -->
        <template v-else>
          <panel-box
            v-for="item in dataSource"
            :key="item.id"
            name="personal"
            :draggable="isDrag"
            :class="backgroundImage === item.hash && 'select'"
            :data="{ src: `${MixinConfig.preview}${item.hash}` }"
            @click="handleSelectImage(item)"
          >
            <!-- 标签 -->
            <template v-if="backgroundImage === item.hash && 'select'" #tag>背景</template>

            <!-- 内容 -->
            <template #content>
              <div class="preview-image__wrap index-center-middle">
                <img :src="`${MixinConfig.preview}${item.hash}`" class="preview-image" />
              </div>
            </template>

            <!-- 标题 -->
            <template #title>{{ item.name }}</template>
          </panel-box>
        </template>
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Empty } from 'ant-design-vue';
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { message } from 'ant-design-vue';
import panelBox from './panelBox.vue';
import { Upload } from '/@/lib/UI/index';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const DICT_TYPE = 'image_manage';
const DICT_VALUE = 'activity_page';

// 数据列表
const dataSource = ref<ImageManage[]>([]);
// 加载
const loading = ref<boolean>(false);
// 判断数据是否为空数据
const isEmpty = computed(() => !dataSource.value.length && !loading.value);
// 背景
const backgroundImage = computed(() => pointStore.getPageOptionsState.backgroundImage);

const options = [
  { label: '背景', value: 1 },
  { label: '插画', value: 2 }
];
const selectType = ref(1);
// 是否可以拖拽
const isDrag = computed(() => selectType.value !== 1);

// 获取服务器数据
async function fetchDataFromServer() {
  try {
    loading.value = true;
    const query = queryData();
    const { data } = await service.fecthImageListByDict(query);
    dataSource.value = data.content;
    // totalElements.value = data.totalElements;
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}
// 数据查询
function queryData() {
  return {
    page: 0,
    size: 20,
    type: DICT_TYPE,
    value: DICT_VALUE,
    sort: 'createTime,desc'
  };
}

function handleSelectImage(record: ImageManage) {
  // 拖拽数据, 禁止点击
  if (isDrag.value) return;
  // 选中图片为背景
  if (selectType.value === 1) {
    let value = record.hash;
    backgroundImage.value === value && (value = '');

    pointStore.commitUpdatePageOptionsState({ key: 'backgroundImage', value });
  }
}

// 处理图片上传成功
function handleUploadSuccess() {
  message.success('文件上传成功，已保存至【我的素材】');

  fetchDataFromServer();
}

fetchDataFromServer();
</script>

<style lang="less" scoped>
.personal-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.personal__header {
  padding: 20px 10px 0;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #292b33;
}

.personal__actions {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 20px;

  ::v-deep(.ant-select-selector) {
    border-radius: 16px;
  }

  ::v-deep(button) {
    border-radius: 16px;
  }
}

.personal__content {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px 0;
}

.preview-image {
  height: 103px;
  max-width: 100%;
  pointer-events: none;

  &__wrap {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
      linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
  }
}
</style>
