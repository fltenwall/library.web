<template>
  <div>
    <div @click="onUploadChange">
      <slot />
    </div>

    <input ref="fileRef" type="file" :accept="accept" class="input-file" @change="handleFileChange" />
  </div>
</template>

<script lang="ts" setup>
import { isFunction } from 'lodash';
import { ref } from 'vue';
import imageUploader from '/@/utils/imageUploader';
import { message } from 'ant-design-vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  beforeUpload: {
    type: Function,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['on-change', 'upload-success']);

const fileRef = ref<{ click: () => void; value: null } | null>(null);
// 处理点击上传
const onUploadChange = () => !props.disabled && fileRef.value!.click();
// 处理选中
const selectUploadImages = imageUploader();
// 文件改变
async function handleFileChange(event: InputEvent) {
  // 获取选中的文件
  const files = (event.target! as unknown as { files: File[] }).files;

  if (!files.length) return;

  emit('on-change', files);

  if (isFunction(props.beforeUpload) && !props.beforeUpload()) return;

  try {
    message.loading(`${files.length}个文件上传中...`, 0);
    const result = await selectUploadImages(files, props.data);
    message.destroy();
    emit('upload-success', result);
  } catch (err) {
    message.destroy();
    // 上传失败
    message.error((err as { msg: string }).msg);
  }

  // 置空数据, 可以重复上传
  fileRef.value!.value = null;
}
</script>

<style lang="less">
.input-file {
  display: none;
}
</style>
