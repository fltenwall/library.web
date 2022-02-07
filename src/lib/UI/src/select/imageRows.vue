<template>
  <div class="image-rows">
    <div v-for="(item, index) in material" :key="index" class="index-middle image-row">
      <div class="index-center-middle image-row-image" @click="handleClick('image', index)">
        <img v-if="item.image" :src="`${MixinConfig.preview}${item.image}`" />
        <icon v-else icon="bi:image" size="16" />
      </div>
      <a-divider type="vertical" />
      <input
        :value="item.label"
        class="image-row-input"
        placeholder="请输入"
        @input="handleInputChange($event, index)"
      />
      <setting-button :data-item="item" @change="handleSettingChange($event, index)">
        <template #default="{ visible }">
          <icon icon="typcn:flash" class="pointer" :color="visible ? '#1890ff' : ''" />
        </template>
      </setting-button>
      <a-divider type="vertical" />
      <div class="image-row-operation operation-button text-red-400" @click="handleClick('delete', index)">
        删除
      </div>
    </div>
    <div class="flex justify-end pr-2">
      <div class="image-row-operation operation-button text-blue-500" @click="handleClick('add', -1)">
        新增
      </div>
    </div>

    <!-- 素材库 -->
    <material-modal
      v-model:value="visibleMaterial"
      dict-type="image_manage"
      dict-value="activity_page"
      :maxlength="1"
      @select="handleSelectMaterial"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Material } from './interface/image';
import type { EditorForm } from '/@/lib/interface/EditorForm';
import type { ImageManage } from '/@/api/basis-manage/material-manage/image-manage';
import settingButton from './components/settingButton.vue';
import propsOptions from './props/image';
import { cloneDeep } from 'lodash-es';

const material = ref<Material[]>([]);

const props = defineProps(propsOptions);

const emit = defineEmits(['update:value']);

const instance = inject('editor-form', {}) as EditorForm;

let isValueUpdateFromInner = false;

const visibleMaterial = ref<boolean>(false);

const selected = ref<number>(-1);

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

// 更多菜单选择
function handleClick(key: string, index: number) {
  if (key === 'image') {
    selected.value = index;
    visibleMaterial.value = true;
  } else if (key === 'delete') {
    material.value.splice(index, 1);
    handlChange(material.value);
  } else if (key === 'add') {
    material.value.push({ link: '', image: '', target: '_self', label: '' });
    handlChange(material.value);
  }
}

// 处理输入改变
function handleInputChange(e: Event, index: number) {
  const value = (e.target! as HTMLInputElement).value;

  handleSettingChange({ key: 'label', value }, index);
}

// 	输入框内容变化时的回调
function handlChange(value: Material[]) {
  isValueUpdateFromInner = true;
  // 父组件更新
  emit('update:value', cloneDeep(value));
  // 传递改变数据
  props.prop && instance.changeTrigger?.(props.prop);
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
input {
  outline: none;
}

.image-row {
  height: 28.85px;
  padding-right: 8px;
  padding-left: 8px;
  border: 1px solid @border-color-base;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }

  &-image {
    cursor: pointer;

    &:active {
      color: #1890ff;
    }

    img {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }
  }

  &-input {
    flex: 1;
    margin-right: 8px;
  }

  &-operation {
    flex-shrink: 0;
    padding: 1px 5px;
    cursor: pointer;
    border-radius: 2px;
    user-select: none;

    &:hover {
      background-color: #f2f3f5;
    }

    &:active {
      background-color: #e5e6eb;
    }
  }
}
</style>
