<template>
  <div class="image-upload-wrap">
    <template v-if="multiple">
      <div
        v-for="(item, index) in material"
        :key="index"
        class="image-warp"
        :class="!item.image && 'bg-light-900'"
      >
        <img
          v-if="item.image"
          :src="`${MixinConfig.preview}${item.image}`"
          class="w-full h-full object-contain"
        />
        <icon v-else icon="bi:image" class="pointer" color="#666" size="16" />

        <!-- 设置 -->
        <setting-button :data-item="item" @change="handleSettingChange($event, index)" />

        <!-- 更多 -->
        <more-button @select="handleClick($event, index)" />
      </div>
      <div class="image-warp bg-light-900" @click="handleClick('add', -1)">
        <icon icon="akar-icons:plus" class="pointer" color="#666" size="16" />
      </div>
    </template>

    <!-- 素材库 -->
    <material-modal
      v-model:value="visible"
      dict-type="image_manage"
      dict-value="activity_page"
      :maxlength="1"
      @select="handleSelectMaterial"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Material } from './interface';
import type { EditorForm } from '/@/lib/interface/EditorForm';
import { cloneDeep } from 'lodash-es';
import propsOptions from './props';
import { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import moreButton from './components/moreButton.vue';
import settingButton from './components/settingButton.vue';

const props = defineProps(propsOptions);

const material = ref<Material[]>([]);

const instance = inject('editor-form', {}) as EditorForm;

const emit = defineEmits(['update:value']);

const visible = ref<boolean>(false);

const selected = ref<number>(-1);

let isValueUpdateFromInner = false;

watch(
  () => props.value,
  () => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      material.value = cloneDeep(props.value);
    }
  },
  { immediate: true }
);

// 	输入框内容变化时的回调
function handlChange(value: Material[]) {
  isValueUpdateFromInner = true;
  // 父组件更新
  emit('update:value', cloneDeep(value));
  // 传递改变数据
  props.prop && instance.changeTrigger?.(props.prop);
}

// 更多菜单选择
function handleClick(key: string, index: number) {
  if (key === 'image') {
    selected.value = index;
    visible.value = true;
  } else if (key === 'delete') {
    material.value.splice(index, 1);
    handlChange(material.value);
  } else if (key === 'add') {
    material.value.push({ link: '', image: '', target: '_self', label: '' });
    handlChange(material.value);
  }
}

// 处理设置改变
function handleSettingChange({ key, value }: { key: keyof Material; value: string }, index: number) {
  material.value[index][key] = value;
  handlChange(material.value);
}

// 选中素材
function handleSelectMaterial([content]: Required<ImageManage>[]) {
  material.value[selected.value].image = content.hash;
  handlChange(material.value);
}
</script>

<style lang="less" scoped>
.image-upload-wrap {
  display: flex;
  flex-wrap: wrap;
}

.image-warp {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 64px;
  margin-bottom: 2px;
  border: 1px solid #e5e5e5;

  &:nth-of-type(3n + 2) {
    margin-right: 2px;
    margin-left: 2px;
  }

  &:hover {
    border-color: #1684fc;

    ::v-deep(.image-more) {
      opacity: 1;
    }
  }
}
</style>
