<template>
  <a-modal v-model:visible="modalState" :style="{ top }" title="设置" :mask-closable="false" :footer="null">
    <image-preview :src="`${MixinConfig.preview}${dataItem.hash}`" @on-instance="initPreviewInstance" />
    <a-form layout="vertical" class="mt10">
      <a-form-item label="分类">
        <select-wrap v-model:value="dataItem.classifyId" :options="organize" />
      </a-form-item>
      <a-form-item label="状态">
        <select-wrap v-model:value="dataItem.status" :options="options" />
      </a-form-item>
      <a-form-item label="名称">
        <a-input v-model:value="dataItem.name" />
      </a-form-item>
    </a-form>
    <a-descriptions :column="2">
      <a-descriptions-item label="创建者">{{ imageData.createBy }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ useMoment(imageData.createTime!) }}</a-descriptions-item>
      <a-descriptions-item label="更新者">{{ imageData.updateBy }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ useMoment(imageData.updateTime!) }}</a-descriptions-item>
    </a-descriptions>

    <div class="index-space-between mt4">
      <div>
        <a-button type="primary" danger @click="handleClickDelete">删除</a-button>
      </div>
      <div>
        <a-button class="mr2" @click="handleClickCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleSaveItem">保存</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { watch, reactive, ref } from 'vue';
import { assign } from 'lodash-es';
import { useMoment } from '/@/utils/dateFormat';
import service, { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import { useDeleteModal } from '/@/hooks/web/useDeleteModal';
import { message } from 'ant-design-vue';
import { difference } from '/@/utils/difference';
import SelectWrap from '/@/components/SelectWrap.vue';
import { isUnDef } from '/@/utils/is';

const props = defineProps({
  organize: {
    type: Array as PropType<{ label: string; value: number }[]>,
    default: () => []
  },
  imageData: {
    type: Object as PropType<ImageManage>,
    default: () => ({})
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible', 'on-success']);

const options = [
  { value: 1, label: '开启' },
  { value: 0, label: '关闭' }
];
// 输入数据
const dataItem = reactive<ImageManage>({});
// 对话框状态
const modalState = ref<boolean>(false);
// 设置距离顶部距离
const top = ref('40px');
// 加载
const loading = ref<boolean>(false);
// 初始化预览位置
let initPosition: () => void;
// 返回预览组件实例
function initPreviewInstance(instance: { initPosition: () => void }) {
  initPosition = instance.initPosition;
}
// 处理点击取消
function handleClickCancel() {
  modalState.value = false;
}

// 处理删除图片
function handleClickDelete() {
  useDeleteModal(async () => {
    try {
      await service.deleteImageById(dataItem.id!);
      modalState.value = false;
      emit('on-success');
    } catch (err) {
      message.error((err as { msg: string }).msg);
    }
  });
}

// 处理保存数据
async function handleSaveItem() {
  try {
    if (loading.value) return;
    loading.value = true;
    // 设置上传数据
    const data = difference<ImageManage>(dataItem, props.imageData);
    // 没有数据就不更新
    if (isUnDef(data)) return;
    await service.updateImage(dataItem.id!, data);
    modalState.value = false;
    emit('on-success');
  } catch (err) {
    message.error((err as { msg: string }).msg);
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      assign(dataItem, props.imageData);

      initPosition?.();
    }
    modalState.value = val;
  }
);

watch(
  () => modalState.value,
  (val) => emit('update:visible', val)
);
</script>

<style lang="less" scoped></style>
