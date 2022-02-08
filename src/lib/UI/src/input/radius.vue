<template>
  <div class="index-middle justify-between">
    <div class="radius-separately">
      <icon icon="tabler:radius-top-left" class="top-left" :color="inputState.topLeft" />
      <icon icon="tabler:radius-top-right" class="top-right" :color="inputState.topRight" />

      <icon icon="tabler:radius-bottom-right" class="bottom-right" :color="inputState.bottomRight" />
      <icon icon="tabler:radius-bottom-left" class="bottom-left" :color="inputState.bottomLeft" />
    </div>
    <div class="flex">
      <ui-input
        class="radius-input"
        placeholder=" "
        @focus="handleInputState('focus', 'topLeft')"
        @blur="handleInputState('blur', 'topLeft')"
      />
      <ui-input
        class="radius-input"
        placeholder=" "
        @focus="handleInputState('focus', 'topRight')"
        @blur="handleInputState('blur', 'topRight')"
      />
      <ui-input
        class="radius-input"
        placeholder=" "
        @focus="handleInputState('focus', 'bottomRight')"
        @blur="handleInputState('blur', 'bottomRight')"
      />
      <ui-input
        class="radius-input"
        placeholder=" "
        @focus="handleInputState('focus', 'bottomLeft')"
        @blur="handleInputState('blur', 'bottomLeft')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import uiInput from '/@/lib/UI/src/input/index';

interface InputState {
  bottomLeft: string;

  bottomRight: string;

  topLeft: string;

  topRight: string;
}

const inputState = ref<Partial<InputState>>({});

function handleInputState(state: 'focus' | 'blur', key: keyof InputState) {
  inputState.value[key] = state === 'focus' ? '#3730a3' : '';
}
</script>

<style lang="less" scoped>
.radius-separately {
  position: relative;
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
  color: @border-color-base;

  .top-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .top-right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .bottom-right {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.radius-input {
  width: 50px;

  &:not(:last-of-type) {
    margin-right: 5px;
  }
}
</style>
