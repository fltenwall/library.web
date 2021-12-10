<template>
  <div :class="['lock-wrap index-center-middle', value && 'lock']" @click="handleChangeState">
    <icon v-if="value" icon="ant-design:lock-outlined" size="14" />
    <icon v-else icon="ant-design:unlock-outlined" size="14" />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { EditorForm } from '/@/lib/interface/EditorForm';

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  prop: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value', 'change']);

const instance = inject('editor-form', {}) as EditorForm;

// 处理切换状态
function handleChangeState() {
  // 更新父组件数据
  emit('update:value', !props.value);

  emit('change', !props.value);
  // 传递改变数据
  instance.changeTrigger?.(props.prop);
}
</script>

<style lang="less" scoped>
.lock-wrap {
  width: 28px;
  height: 28px;
  cursor: pointer;

  &.lock {
    background: #f2f2f2;
    border-radius: 3px;
  }
}
</style>
