<template>
  <div>
    <div class="flex mb-4">
      <div class="index-middle mr-2">
        <div class="flex-shrink-0 w-13 radius-label">左上角</div>
        <ui-input v-model:value="inputState.topLeft" type="number" @change="handleInputChange" />
      </div>
      <div class="index-middle">
        <div class="flex-shrink-0 w-13 radius-label">右上角</div>
        <ui-input v-model:value="inputState.topRight" type="number" @change="handleInputChange" />
      </div>
    </div>
    <div class="flex mb-4">
      <div class="index-middle mr-2">
        <div class="flex-shrink-0 w-13 radius-label">右下角</div>
        <ui-input v-model:value="inputState.bottomLeft" type="number" @change="handleInputChange" />
      </div>
      <div class="index-middle">
        <div class="flex-shrink-0 w-13 radius-label">右下角</div>
        <ui-input v-model:value="inputState.bottomRight" type="number" @change="handleInputChange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import uiInput from '/@/lib/UI/src/input/index';
import type { EditorForm } from '/@/lib/interface/EditorForm';

interface InputState {
  bottomLeft: number;

  bottomRight: number;

  topLeft: number;

  topRight: number;
}

const props = defineProps({
  prop: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: ''
  }
});

const emit = defineEmits(['update:value']);

const instance = inject('editor-form', {}) as EditorForm;

let isValueUpdateFromInner = false;

const inputState = ref<Partial<InputState>>({});

function handleInputChange() {
  const input = unref(inputState);
  const ruslut = `${input.topLeft} ${input.topRight} ${input.bottomRight} ${input.bottomLeft}`;

  handlChange(ruslut);
}

// 	输入框内容变化时的回调
function handlChange(value: string) {
  isValueUpdateFromInner = true;
  // 父组件更新
  emit('update:value', value);
  // 传递改变数据
  props.prop && instance.changeTrigger?.(props.prop);
}

// 设置输入的值
function setInputState(key: keyof InputState, value: string) {
  inputState.value[key] = parseInt(value || '0');
}

watch(
  () => props.value,
  (value) => {
    const result = String(value).split(' ');
    if (isValueUpdateFromInner) {
      isValueUpdateFromInner = false;
    } else if (result.length === 1) {
      setInputState('topLeft', result[0]);
      setInputState('topRight', result[0]);
      setInputState('bottomRight', result[0]);
      setInputState('bottomLeft', result[0]);
    } else if (result.length === 4) {
      setInputState('topLeft', result[0]);
      setInputState('topRight', result[1]);
      setInputState('bottomRight', result[2]);
      setInputState('bottomLeft', result[3]);
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
