<template>
  <div>
    <div @click="onUploadChange">
      <slot />
    </div>

    <input ref="fileRef" type="file" accept="image/*" class="input-file" @change="handleFileChange" />
  </div>
</template>

<script lang="ts" setup>
import { isFunction } from 'lodash';
import { ref } from 'vue';
import WebUploader from '/@/utils/webUploader';
import service from '/@/api/basis-manage/material-manage/image-manage';
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
    await selectUploadImages(files);
    message.destroy();
    emit('upload-success');
  } catch (err) {
    message.destroy();
    // 上传失败
    message.error((err as { msg: string }).msg);
  }

  // 置空数据, 可以重复上传
  fileRef.value!.value = null;
}

function imageUploader(): (files: File[]) => Promise<void> {
  const webUploader = new WebUploader({ chunkSize: 1024 * 1024 * 5 });

  function sendRequest(list: FormData[]) {
    return new Promise((resolve) => {
      let idx = 0;
      let max = 5;
      let counter = 0;
      const total = list.length;
      const start = () => {
        // 有请求，有通道
        while (idx < total && max > 0) {
          max--;
          service.saveImageNewItem(list[idx++]).then(() => {
            max++;
            counter++;
            if (counter === total) resolve('');
            else start();
          });
        }
      };
      start();
    });
  }

  return async function (files: File[]) {
    const currents = await webUploader.sendUploadContent(files);
    // 校验文件
    const [current] = await webUploader.uploadFileBefore(currents);

    if (!current) return;

    const list = [];

    for (const { chunk, hash } of current.chunkList) {
      const data = new FormData();
      data.append('chunkHash', hash);
      data.append('chunk', chunk);
      list.push(data);
    }
    // 发生上传
    await sendRequest(list);
    // 合并请求
    await service.mergeChunks({ ...props.data, hash: current.hash });
  };
}
</script>

<style lang="less">
.input-file {
  display: none;
}
</style>
