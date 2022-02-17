<template>
  <a-form-item label="圆角">
    <ui-input v-model:value="inputState" @change="handleInputChange" />
  </a-form-item>
</template>

<script lang="ts" setup>
import uiInput from '/@/lib/UI/src/input/index';
import type { EditorForm } from '/@/lib/interface/EditorForm';

const props = defineProps({
  prop: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value']);

const instance = inject('editor-form', {}) as EditorForm;

let isValueUpdateFromInner = false;

const inputState = ref<string>('');

function handleInputChange() {
  handlChange(inputState.value);
}

// 	输入框内容变化时的回调
function handlChange(value: string) {
  isValueUpdateFromInner = true;
  // 父组件更新
  emit('update:value', value);
  // 传递改变数据
  props.prop && instance.changeTrigger?.(props.prop);
}

watch(
  () => props.value,
  (value) => {
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else {
      inputState.value = value;
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.radius-label {
  &::after {
    margin-left: 2px;
    content: ':';
  }
}
</style>
