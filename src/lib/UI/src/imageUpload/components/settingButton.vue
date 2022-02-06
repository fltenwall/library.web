<template>
  <a-dropdown
    v-model:visible="visible"
    placement="bottomRight"
    trigger="click"
    :get-popup-container="(triggerNode: Node) => triggerNode.parentNode"
  >
    <icon icon="typcn:flash" class="image-flash" />

    <template #overlay>
      <div class="image-flash-ul">
        <div class="h-8 pl-4 flex items-center font-bold">设置</div>
        <hr />
        <div class="pl-4 mt-2 text-gray-500">名称</div>
        <div class="ml-4 mr-4 mt-2">
          <ui-input :value="dataItem.label" @change="handleChange($event, 'label')" />
        </div>
        <div class="pl-4 mt-2 pr-4 h-7 index-space-between index-middle">
          <div class="text-gray-500">行为</div>
          <div>跳转超链接</div>
        </div>
        <div class="pl-4 mt-2 pr-4 index-space-between index-middle">
          <div class="text-gray-500">跳转</div>
          <div class="w-30">
            <ui-select :value="dataItem.target" :options="targets" @change="handleChange($event, 'target')" />
          </div>
        </div>
        <div class="pl-4 mt-2 text-gray-500">地址</div>
        <div class="ml-4 mr-4 mt-2">
          <a-textarea
            :value="dataItem.link"
            placeholder="输入 http/https 协议的地址"
            :auto-size="{ minRows: 3, maxRows: 3 }"
            @change="(e:InputEvent) => handleChange((e.target! as HTMLInputElement).value,'link')"
          />
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Material } from '../interface';
import UiInput from '/@/lib/UI/src/input/index';
import UiSelect from '/@/lib/UI/src/select/index';

defineProps({
  dataItem: {
    type: Object as PropType<Material>,
    default: () => ({})
  }
});

const emit = defineEmits(['change']);

const visible = ref<boolean>(false);

const targets = [
  { label: '新开窗口', value: '_blank' },
  { label: '当前页跳转', value: '_self' }
];

function handleChange(value: string, key: string) {
  emit('change', { key, value });
}
</script>

<style lang="less" scoped>
.image-flash {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  color: #666;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;

  &-ul {
    width: 210px;
    padding-bottom: 12px;
    font-size: 12px;
    background: #fff;
    border: 1px solid #d9d9d9;
  }
}
</style>
