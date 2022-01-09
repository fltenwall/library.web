<template>
  <div class="personal-wrap">
    <div class="personal__actions">
      <div class="personal__header">我的素材</div>
      <upload :data="{ value: DICT_VALUE, type: DICT_TYPE }" @upload-success="handleUploadSuccess">
        <div class="personal__actions-upload">上 传</div>
      </upload>
    </div>
    <scrollbar @on-reach-bottom="handleScrollBottom">
      <div class="personal__content">
        <!-- 空数据 -->
        <a-empty v-if="isEmpty" :image="simpleImage" class="personal__content-empty" />

        <!-- 内容 -->
        <template v-else>
          <panel-box
            v-for="item in dataSource"
            :key="item.id"
            name="personal"
            :class="backgroundImage === item.hash && 'select'"
            :data="{ src: `${MixinConfig.preview}${item.hash}` }"
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

        <!-- 加载数据中 -->
        <div v-if="loading" class="loading__wrap">
          <loading-outlined :style="{ color: '#1890ff' }" />
          <div class="loading__title">加载中</div>
        </div>
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, unref } from 'vue';
import { Empty } from 'ant-design-vue';
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { usePagination } from '/@/hooks/web/usePagination';
import { message } from 'ant-design-vue';
import { Upload } from '/@/lib/UI/index';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';
import panelBox from './panelBox.vue';
import { concat } from 'lodash';

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
    type: DICT_TYPE,
    value: DICT_VALUE,
    ...getPagination(),
    sort: 'createTime,desc'
  };
}

// 处理图片上传成功
function handleUploadSuccess() {
  message.success('文件上传成功，已保存至【我的素材】');
  current.value = 1;
  fetchDataFromServer();
}
// 滚动条滚动到底部触发
function handleScrollBottom() {
  if (unref(current) * unref(pageSize) < unref(totalElements) && !unref(loading)) {
    // 滚动加载分页数据
    current.value += 1;

    fetchDataFromServer();
  }
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
  align-items: flex-end;
  padding: 10px 10px 20px;

  &-upload {
    padding-right: 10px;
    font-size: 12px;
    color: @primary-color;
    cursor: pointer;
  }
}

.personal__content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 10px;

  &-empty {
    width: 100%;
  }
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

.loading__wrap {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding-top: 20px;
  text-align: center;

  .loading__title {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>
