<template>
  <div class="mr1 ml1" @click="openFile">
    <input ref="inputRef" type="file" class="display-none" :accept="accept" @change="handleFiles" />
    <a-button :loading="loading">
      {{ title }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { userStore } from '/@/store/modules/user';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '批量导入'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  emits: ['on-batch-import'],
  setup(_props, { emit }) {
    const inputRef = ref<{ click: () => void; files: Blob[]; value: string }>();

    const loading = ref<boolean>(false);

    // 设置上传的请求头部
    const headers = computed(() => {
      return {
        [userStore.getTokenState?.headerName as string]: userStore.getTokenState?.token
      };
    });

    // 打开选中文件
    function openFile() {
      inputRef.value?.click();
    }

    // 获取文件
    function handleFiles() {
      const file = inputRef.value?.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file as Blob);
      loading.value = true;
      emit('on-batch-import', formData, () => {
        inputRef.value!.value = '';
        loading.value = false;
      });
    }

    return { headers, inputRef, loading, openFile, handleFiles };
  }
});
</script>

<style lang="less" scoped></style>
