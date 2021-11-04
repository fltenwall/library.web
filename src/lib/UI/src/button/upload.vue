<template>
  <div>
    <div @click="onUploadChange">
      <slot />
    </div>

    <input
      ref="fileRef"
      type="file"
      accept="image/*"
      class="input-file"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
  }
});
const emit = defineEmits(['on-change']);

const fileRef = ref<{ click: () => void; value: null } | null>(null);
// 处理点击上传
const onUploadChange = () => !props.disabled && fileRef.value!.click();
// 处理选中
// 文件改变
async function handleFileChange(event: InputEvent) {
  // 获取选中的文件
  const files = (event.target! as unknown as { files: File[] }).files;

  if (!files.length) return;

  emit('on-change', files);
  // 置空数据, 可以重复上传
  fileRef.value!.value = null;
}
</script>

<style lang="less">
.input-file {
  display: none;
}
</style>
