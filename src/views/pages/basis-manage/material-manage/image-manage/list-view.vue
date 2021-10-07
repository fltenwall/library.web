<template>
  <div class="list-view">
    <div class="list-view-header">
      <div>{{ classify.title || '全部' }}</div>
      <div>
        <a-button
          type="primary"
          :loading="loading"
          :disabled="!classify.id"
          @click="onUploadChange"
        >
          上传图片
        </a-button>
        <input
          ref="fileRef"
          type="file"
          accept="image/*"
          class="input-file"
          @change="handleFileChange"
        />
      </div>
    </div>
    <div class="flex-item flex flex-column list-view-cotent">
      <image-list ref="imageListRef" :classify="classify" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';
import imageList from './components/image-list.vue';
import { Classify } from '/@/api/basis-manage/material-manage/image-manage';
import { imageUploader } from './data-list';

export default defineComponent({
  components: { imageList },
  props: {
    classify: {
      type: Object as PropType<Required<Classify>>,
      default: () => ({})
    }
  },
  setup(props) {
    const selectUploadImages = imageUploader();
    // 处理点击上传
    const onUploadChange = () => fileRef.value!.click();
    // 文件
    const fileRef = ref<{ click: () => void; value: null } | null>(null);
    // 上传中
    const loading = ref<boolean>(false);

    const imageListRef = ref<{ fetchDataFromServer: () => void } | null>(null);

    // 文件改变
    async function handleFileChange(event: InputEvent) {
      // 获取选中的文件
      const files = (event.target! as unknown as { files: File[] }).files;
      if (!files.length) return;
      loading.value = true;
      // 设置上传数据
      await selectUploadImages(files, props.classify.id);
      loading.value = false;
      // 置空数据, 可以重复上传
      fileRef.value!.value = null;
      // 刷新数据
      imageListRef.value?.fetchDataFromServer();
    }

    // 选中的 按钮
    const selectRadio = ref<number>(1);
    return {
      fileRef,
      loading,
      selectRadio,
      imageListRef,
      onUploadChange,
      handleFileChange
    };
  }
});
</script>

<style lang="less" scoped>
.list-view {
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0 9px;
    font-weight: bold;
    color: #000000d9;
  }

  &-main {
    flex: 1;
    height: 0;
  }

  &-cotent {
    height: 0;
  }

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
}

.input-file {
  display: none;
}

.upload-button {
  height: 32px;
  cursor: pointer;
}
</style>
