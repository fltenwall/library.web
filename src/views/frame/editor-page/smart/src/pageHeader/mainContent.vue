<template>
  <div class="header-input index-theme index-center-middle">
    <input
      ref="inputRef"
      :value="pageOptions.name"
      class="name-input mr-2"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @input="onInputChange"
    />
    <div class="edit-icon-wrap index-center-middle">
      <icon v-show="!inputState" icon="entypo:edit" class="pointer" @click="onClickEdit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { pointStore } from '/@/store/modules/point';

const inputRef = ref<HTMLElement | null>(null);
//
const inputState = ref<boolean>(false);
//
const pageOptions = computed(() => pointStore.getPageOptionsState);
// 处理输入框获取焦点
const onInputFocus = () => (inputState.value = true);
// 处理输入框失去焦点
const onInputBlur = () => (inputState.value = false);
// 处理点击编辑
const onClickEdit = () => inputRef.value?.focus();
// 处理输入内容
function onInputChange(e: Event) {
  const value = (e.target as unknown as { value: string }).value;
  pointStore.commitUpdatePageOptionsState({ key: 'name', value });
}
</script>

<style lang="less" scoped>
.header {
  &-input {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 20px;
    font-size: 18px;
    color: @primary-color;
    transform: translate(-50%, -50%);

    .name-input {
      position: relative;
      width: 120px;
      margin: 0 10px 0 0;
      overflow: hidden;
      color: #292b33;
      text-align: center;
      text-overflow: ellipsis;
      cursor: pointer;
      border: 0 solid transparent;
      border-bottom: 1px solid transparent;
      outline: none;
      caret-color: @primary-color;

      &:focus {
        cursor: text;
      }
    }
  }
}

.edit-icon {
  &-wrap {
    width: 14px;
  }
}
</style>
