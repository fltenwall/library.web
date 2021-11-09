<template>
  <button
    ref="button"
    class="globla-button"
    :class="{ 'index-disabled': disabled }"
    @click="handleClick($event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { isNumber } from '/@/utils/is';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: undefined
    }
  },
  emits: ['on-click'],
  setup(props, { emit }) {
    const button = ref<HTMLNULL>(null);
    const ripples: HTMLElement[] = [];

    // 处理动画
    const handleAnimation = (x?: number, y?: number): HTMLElement => {
      // const x = event.offsetX
      // const y = event.offsetY
      const span = document.createElement('span');
      span.style.left = x ? `${x}px` : '50%';
      span.style.top = y ? `${y}px` : '50%';
      button.value!.appendChild(span);
      return span;
    };
    // 处理点击
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return;
      emit('on-click', event);
    };

    const startAnimation = (x?: number, y?: number) => {
      if (isNumber(props.size) && ripples.length >= props.size) return;
      const span = handleAnimation(x, y);
      ripples.push(span);
    };

    const stopAnimation = () => {
      const span = ripples.shift();
      span?.remove();
    };

    return { handleClick, button, startAnimation, stopAnimation };
  }
});
</script>

<style lang="less">
.globla-button {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background: @primary-color;
  border-width: 0;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;

  span {
    position: absolute;
    pointer-events: none;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: button-animate 1s linear infinite;
  }

  @keyframes button-animate {
    0% {
      width: 0;
      height: 0;
      opacity: 0.5;
    }

    100% {
      width: 700px;
      height: 600px;
      opacity: 0;
    }
  }
}
</style>
