<template>
  <a-dropdown v-model:visible="visible" trigger="click">
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
            @on-start="handleSliderThumbMove"
            @on-move="handleSliderThumbMove"
          >
            <div ref="sliderThumb" class="color-main-slider-thumb" :style="sliderThumbStyle" />
          </draggable-place>
        </div>

        <!-- 透明 -->
        <draggable-place
          ref="alpha"
          class="color-alpha-slider"
          @on-start="handleAlphaThumbMove"
          @on-move="handleAlphaThumbMove"
        >
          <div ref="alphaThumb" class="color-alpha-slider-thumb" :style="alphatThumbStyle" />
        </draggable-place>

        <!-- 底部 -->
        <div class="color-footer">
          <div class="flex justify-between">
            <div class="flex">
              <ui-input
                v-model:value="inputColorRgb.r"
                class="w10 color-footer-input"
                :max="255"
                type="number"
                placeholder=" "
                @blur="handleInputRgbBlur"
              />
              <ui-input
                v-model:value="inputColorRgb.g"
                class="w10 color-footer-input"
                :max="255"
                type="number"
                placeholder=" "
                @blur="handleInputRgbBlur"
              />
              <ui-input
                v-model:value="inputColorRgb.b"
                class="w10 color-footer-input"
                :max="255"
                type="number"
                placeholder=" "
                @blur="handleInputRgbBlur"
              />
              <ui-input
                v-model:value="inputColorRgb.a"
                class="w10 color-footer-input"
                :max="1"
                type="number"
                placeholder=" "
                @blur="handleInputRgbBlur"
              />
            </div>
            <div>
              <ui-input
                v-model:value="inputColorHex"
                class="w-25 color-footer-input"
                placeholder=" "
                @blur="handleInputHexBlur"
              />
            </div>
          </div>
          <div class="mt-3 text-right">
            <a-button class="color-footer-button mr-3.2" @click="handleUnSelectColor">取消</a-button>
            <a-button class="color-footer-button" @click="handleSelectColor">确定</a-button>
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
import { DraggablePlace } from '/@/lib/UI/';
import { reactive, computed, ref, watch, nextTick } from 'vue';
import { isUndefined } from '/@/utils/is';
import { clamp } from 'lodash';
import propsOptions from './props';
import tinycolor from 'tinycolor2';
import UiInput from '/@/lib/UI/src/input/index';

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

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const emits = defineEmits(['update:value', 'change']);

const props = defineProps(propsOptions);

const inputColorRgb = ref<Rgba>({ r: 255, g: 255, b: 255, a: 1 });

const inputColorHex = ref<string>('#ffffff');

const currentColor = ref<string>('rgba(255, 255, 255, 1)');

const cacheInputColor = ref<string>('rgba(255, 255, 255, 1)');

const slider = ref<{ $el: HTMLElement } | null>(null);

const alpha = ref<{ $el: HTMLElement } | null>(null);

const svpanel = ref<{ $el: HTMLElement } | null>(null);

const sliderThumb = ref<HTMLNULL>(null);

const alphaThumb = ref<HTMLNULL>(null);

const cursor = ref<HTMLNULL>(null);

const cursorStyle = reactive<CSSProperties>({});

const sliderThumbStyle = reactive<CSSProperties>({});

const alphatThumbStyle = reactive<CSSProperties>({});

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

    inputColorRgb.value = tinycolor(color).toRgb();

    inputColorHex.value = tinycolor(color).toHex8String();
  }
);

watch(
  () => props.value,
  (color) => {
    if (isValueUpdateFromInner.value) {
      isValueUpdateFromInner.value = false;
    } else {
      cacheInputColor.value = color;

      updateColor(color);

      updatePosition();
    }
  },
  { immediate: true }
);

// 点击确定更新数据
function handleSelectColor() {
  cacheInputColor.value = currentColor.value;

  emits('update:value', currentColor.value);

  visible.value = false;
}

// 颜色更新
function updateColor(color: Hsla | string) {
  const value = tinycolor(color).isValid() ? color : 'rgba(255, 255, 255, 1)';

  currentColor.value = tinycolor(value).toRgbString();
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
function handleSliderThumbMove({ y, container: { height } }: Move) {
  sliderThumbStyle.top = `${y}px`;

  if (y < 0) {
    hsva.value.h = 360;
  } else if (y > height) {
    hsva.value.h = 0;
  } else {
    hsva.value.h = (y / height) * 360;
  }

  updateColor(hsva.value);
}

// 透明的发生变化
function handleAlphaThumbMove({ x, container: { width } }: Move) {
  alphatThumbStyle.left = `${x}px`;

  if (x < 0) {
    hsva.value.a = 0;
  } else if (x > width) {
    hsva.value.a = 1;
  } else {
    hsva.value.a = +(x / width).toFixed(1);
  }

  updateColor(hsva.value);
}

// 输入失去的值
function handleInputRgbBlur() {
  const color = tinycolor(inputColorRgb.value);

  inputColorRgb.value = color.toRgb();

  updateColor(color.toHex());

  updatePosition();
}

// 输入失去的值
function handleInputHexBlur() {
  const color = tinycolor(inputColorHex.value);

  inputColorHex.value = color.toHex8String();

  updateColor(color.toHex());

  updatePosition();
}

function updatePosition() {
  const { h, s, v } = tinycolor(currentColor.value).toHsv();

  hsva.value = { h, s, v, a: 1 };

  update();
}

function update() {
  cursorStyle.top = `${getCursorTop()}px`;
  cursorStyle.left = `${getCursorLeft()}px`;

  sliderThumbStyle.top = `${getThumbTop()}px`;

  alphatThumbStyle.left = `${getThumbLeft()}px`;
}

function getCursorLeft() {
  const el = svpanel.value?.$el;

  if (isUndefined(el)) return 0;

  return el.offsetWidth * hsva.value.s;
}

function getCursorTop() {
  const el = svpanel.value?.$el;

  if (isUndefined(el)) return 0;

  return (hsva.value.v - 1) * el.offsetHeight * -1;
}

function getThumbTop() {
  const el = slider.value?.$el;

  if (isUndefined(el)) return 0;

  if (hsva.value.h === 0) {
    return el.offsetHeight;
  } else if (hsva.value.h === 360) {
    return 0;
  }

  return (hsva.value.h / 360) * el.offsetHeight - sliderThumb.value!.offsetHeight / 2;
}

function getThumbLeft() {
  const el = alpha.value?.$el;

  if (isUndefined(el)) return 0;

  if (hsva.value.a === 0) {
    return 0;
  } else if (hsva.value.a === 1) {
    return el.offsetWidth;
  }

  return hsva.value.a * el.offsetWidth - alphaThumb.value!.offsetHeight / 2;
}

function handleUnSelectColor() {
  updateColor(cacheInputColor.value);

  updatePosition();

  visible.value = false;
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
    width: 300px;
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

.color-alpha-slider {
  position: relative;
  width: 300px;
  height: 12px;
  margin-top: 10px;
  background: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
    linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
  background-position: 0 0, 6px 6px;
  background-size: 12px 12px;

  &-thumb {
    position: absolute;
    width: 4px;
    height: 100%;
    cursor: pointer;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 2px #0009;
  }
}

.color-footer {
  margin: 10px 0 0;

  &-input {
    ::v-deep(input) {
      height: 28px;
      padding: 4px 5px;
      font-size: 12px;
    }

    &:not(:first-of-type) {
      margin-left: 8px;
    }
  }

  &-button {
    height: 28px;
    padding: 0 7px;
    font-size: 12px;
  }
}
</style>
