<template>
  <popup trigger="click">
    <div class="color-picker-trigger">
      <div class="color-picker-color"></div>
    </div>

    <!-- 弹出层 -->
    <template #overlay>
      <div class="color-picker-panel">
        <!-- 中间 -->
        <div class="color-main">
          <draggable-place
            class="color-main-svpanel"
            :style="{ background: bgColor }"
            @on-start="handleCursorMove"
            @on-move="handleCursorMove"
          >
            <div class="color-main-svpanel-white" />
            <div class="color-main-svpanel-black" />
            <div class="color-main-svpanel-cursor" :style="cursorStyle">
              <div />
            </div>
          </draggable-place>

          <draggable-place
            class="color-main-slider"
            @on-start="handleThumbMove"
            @on-move="handleThumbMove"
          >
            <div class="color-main-slider-thumb" :style="thumbStyle" />
          </draggable-place>
        </div>
        <!-- 底部 -->
        <div class="color-footer">
          <a-input v-model:value="inputHex" prefix="#" class="color-footer-input" />
          <a-button class="color-footer-button">确定</a-button>
        </div>
      </div>
    </template>
  </popup>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { DraggablePlace, Popup } from '/@/lib/UI/';
import { reactive, computed, ref } from 'vue';
import { clamp } from 'lodash';
import { colord } from 'colord';

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

const inputHex = ref<string>('');

const cursorStyle = reactive<CSSProperties>({});

const thumbStyle = reactive<CSSProperties>({});

const hsla = reactive<Hsla>({ h: 0, s: 0, v: 100, a: 1 });

const bgColor = computed(() => `hsl(${hsla.h}, 100%, 50%)`);

// 移动中
function handleCursorMove({ x, y, container: { height, width } }: Move) {
  // 设置偏移
  cursorStyle.left = `${x}px`;
  cursorStyle.top = `${y}px`;

  hsla.s = (x / width) * 100;
  hsla.v = clamp(-(y / height) + 1, 0, 1) * 100;

  inputHex.value = colord(hsla).toHex().replace(/^#/, '');
}

function handleThumbMove({ y, container: { height } }: Move) {
  thumbStyle.top = `${y}px`;

  if (y < 0) {
    hsla.h = 360;
  } else if (y > height) {
    hsla.h = 0;
  } else {
    hsla.h = 360 * (y / height);
  }
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
  }

  &-button {
    height: 28px;
    padding: 0 7px;
  }
}
</style>
