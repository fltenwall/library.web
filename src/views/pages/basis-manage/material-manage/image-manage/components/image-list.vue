<template>
  <div class="image-list flex flex-column">
    <div class="flex flex-space-between p-4">
      <div v-if="classifyId">
        <!-- <a-button type="primary" @click="onUploadChange">
          上传图片
        </a-button>
        <input ref="fileRef" type="file" accept="image/*" class="input-file" @change="handleFileChange"> -->
      </div>
      <div />
      <div class="operation-content">
        <a-checkbox> 当前页全选 </a-checkbox>
        <a-button class="ml-4">
          删除
        </a-button>
        <a-button class="ml-4">
          移动至
        </a-button>
        <a-button class="ml-4">
          重命名
        </a-button>
      </div>
    </div>
    <Scrollbar class="flex-item">
      <template v-for="item in dataSource" :key="item.id">
        <div class="preview-wrap">
          <div class="preview-content">
            <img :src="MixinConfig.preview + item.hash" class="preview-image">
            <div class="index-hidden-newline w-200">
              {{ item.name }}
            </div>
          </div>
        </div>
      </template>
    </Scrollbar>
    <div class="image-list-footer">
      <PaginationWrap :total="totalElements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePagination } from '/@/hooks/web/usePagination'
import { Scrollbar } from '/@/components/Scrollbar'
import { imageUploader } from './image-list'

export default defineComponent({
  components: { Scrollbar },
  props: {
    classifyId: {
      // 分组
      type: String,
      default: ''
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    totalElements: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const selectUploadImages = imageUploader()
    // 处理点击上传
    const onUploadChange = () => fileRef.value!.click()
    // 文件
    const fileRef = ref<{ click: () => void; value: null } | null>(null)
    // 获取分页
    const pagination = usePagination()
    // 文件改变
    async function handleFileChange(event: InputEvent) {
      // 获取选中的文件
      const files = (event.target! as unknown as { files: File[] }).files
      if (!files.length) return
      // 设置上传数据
      await selectUploadImages(files, props.classifyId)
      // 置空数据, 可以重复上传
      fileRef.value!.value = null
    }

    return { fileRef, ...pagination, onUploadChange, handleFileChange }
  }
})
</script>

<style lang="less" scoped>
.image-list {
  height: 100%;
  border: 1px solid #e3e3e3;

  .preview-wrap {
    display: inline-block;
    margin: 0 8px 10px 16px;
    text-align: center;
  }

  .preview-image {
    width: 200px;
    height: 135px;
    border-radius: 8px;
    object-fit: cover;
  }

  &-footer {
    padding: 16px;
    text-align: right;
  }
}

.input-file {
  display: none;
}

.upload-button {
  height: 32px;
  cursor: pointer;
}

@media screen and (max-width: 1230px) {
  .operation-content {
    display: none;
  }
}
</style>
