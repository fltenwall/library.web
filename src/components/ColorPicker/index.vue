<template>
  <popup v-model:visible="visible">
    <div class="color-picker-trigger">
      <div class="color-picker-color" :style="{ background: currentColor }" />
    </div>

    <!-- 弹出层 -->
    <template #overlay>
      <div class="color-picker-panel">
        <!-- 中间 -->
        <div class="color-main">
          <draggable-place
            ref="svpanel"
            class="color-main-svpanel"
            :style="{ background: bgColor }"
            @on-start="handleCursorMove"
            @on-move="handleCursorMove"
          >
            <div class="color-main-svpanel-white" />
            <div class="color-main-svpanel-black" />
            <div ref="cursor" class="color-main-svpanel-cursor" :style="cursorStyle">
              <div />
            </div>
          </draggable-place>

          <draggable-place
            ref="slider"
            class="color-main-slider"
            @on-start="handleThumbMove"
            @on-move="handleThumbMove"
          >
            <div ref="thumb" class="color-main-slider-thumb" :style="thumbStyle" />
          </draggable-place>
        </div>
        <!-- 底部 -->
        <div class="color-footer">
          <a-input v-model:value="inputColor" class="color-footer-input" @blur="handleInputBlur" />
          <a-button class="color-footer-button" @click="handleSelectColor">确定</a-button>
        </div>
      </div>
    </template>
  </popup>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { DraggablePlace, Popup } from '/@/lib/UI/';
import { reactive, computed, ref, watch, nextTick } from 'vue';
import { isUnDef } from '/@/utils/is';
import { clamp } from 'lodash';
import propsOptions from './props';
import tinycolor from 'tinycolor2';

interface Move {
  x: number;
  y: number;
  container: { height: number; width: number };
}

interface Hsla {
  h: number;
  s: number;
  v: number;
  a: number;
}

const emits = defineEmits(['update:value', 'change']);

const props = defineProps(propsOptions);

const inputColor = ref<string>('#000000');

const currentColor = ref<string>('#000000');

const slider = ref<{ $el: HTMLElement } | null>(null);

const svpanel = ref<{ $el: HTMLElement } | null>(null);

const thumb = ref<HTMLNULL>(null);

const cursor = ref<HTMLNULL>(null);

const cursorStyle = reactive<CSSProperties>({});

const thumbStyle = reactive<CSSProperties>({});

const visible = ref<boolean>(false);

const isValueUpdateFromInner = ref<boolean>(false);

const hsva = ref<Hsla>({ h: 0, s: 0, v: 0, a: 1 });

const bgColor = computed(() => `hsl(${hsva.value.h}, 100%, 50%)`);

watch(
  () => visible.value,
  (val) => {
    val && nextTick(update);
  }
);

watch(
  () => currentColor.value,
  (color) => {
    isValueUpdateFromInner.value = true;

    emits('change', color);

    inputColor.value = color;
  }
);

watch(
  () => props.value,
  (color) => {
    if (isValueUpdateFromInner.value) {
      isValueUpdateFromInner.value = false;
    } else {
      updateColor(color);
    }
  },
  { immediate: true }
);

// 点击确定更新数据
function handleSelectColor() {
  emits('update:value', currentColor.value);

  visible.value = false;
}

// 颜色更新
function updateColor(color: Hsla | string) {
  const value = tinycolor(color).isValid() ? color : '#000000';

  currentColor.value = tinycolor(value).toHexString();
}

// 获取 饱和度, 明度
function handleCursorMove({ x, y, container: { height, width } }: Move) {
  // 设置偏移
  cursorStyle.left = `${x}px`;
  cursorStyle.top = `${y}px`;

  hsva.value.s = x / width;
  hsva.value.v = clamp(-(y / height) + 1, 0, 1);

  updateColor(hsva.value);
}

// 获取 色相
function handleThumbMove({ y, container: { height } }: Move) {
  thumbStyle.top = `${y}px`;

  if (y < 0) {
    hsva.value.h = 360;
  } else if (y > height) {
    hsva.value.h = 0;
  } else {
    hsva.value.h = (y / height) * 360;
  }

  updateColor(hsva.value);
}

// 输入失去的值
function handleInputBlur() {
  updateColor(inputColor.value);

  const { h, s, v } = tinycolor(currentColor.value).toHsv();

  hsva.value = { h, s, v, a: 1 };

  update();
}

function update() {
  cursorStyle.top = `${getCursorTop()}px`;
  cursorStyle.left = `${getCursorLeft()}px`;

  thumbStyle.top = `${getThumbTop()}px`;
}

function getCursorLeft() {
  const el = svpanel.value?.$el;

  if (isUnDef(el)) return 0;

  return el.offsetWidth * hsva.value.s;
}

function getCursorTop() {
  const el = svpanel.value?.$el;

  if (isUnDef(el)) return 0;

  return (hsva.value.v - 1) * el.offsetHeight * -1;
}

function getThumbTop() {
  const el = slider.value?.$el;

  if (isUnDef(el)) return 0;

  if (hsva.value.h === 0) {
    return el.offsetHeight;
  } else if (hsva.value.h === 360) {
    return 0;
  }

  return (hsva.value.h / 360) * el.offsetHeight - thumb.value!.offsetHeight / 2;
}
</script>

<style lang="less" scoped>
.color-picker {
  &-trigger {
    width: 46px;
    height: 24px;
    padding: 5px;
    cursor: pointer;
    border: 1px solid #d9d9d9;
  }

  &-color {
    width: 100%;
    height: 100%;
    background: #444;
  }

  &-panel {
    padding: 10px;
    background: #fff;
    border: 1px solid #d9d9d9;
  }
}

.color-main {
  display: flex;

  &-svpanel {
    position: relative;
    width: 280px;
    height: 180px;
    margin: 0 10px 0 0;

    &-white {
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }

    &-black {
      background: linear-gradient(to top, #000, transparent);
    }

    &-white,
    &-black {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &-cursor {
      position: absolute;
      top: 0;
      left: 0;

      & > div {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        transform: translate(-2px, -2px);
        box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px #0000004d, 0 0 1px 2px #0006;
      }
    }
  }

  &-slider {
    position: relative;
    width: 12px;
    height: 180px;
    background: linear-gradient(
      to bottom,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      #f00 100%
    );

    &-thumb {
      position: absolute;
      left: 0;
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #fff;
      border: 1px solid #f0f0f0;
      box-shadow: 0 0 2px #0009;
    }
  }
}

.color-footer {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;

  &-input {
    width: 160px;
    height: 28px;
    font-size: 12px;
  }

  &-button {
    height: 28px;
    padding: 0 7px;
    font-size: 12px;
  }
}
</style>
