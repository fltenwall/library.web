<template>
  <div class="scrollbar-box">
    <div ref="wrap" class="scrollbar-wrap scrollbar-wrap-hidden-default">
      <component :is="tag" ref="resize" class="h100">
        <slot />
      </component>
    </div>
    <bar :size="sizeWidth" />
    <bar vertical :size="sizeHeight" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Bar from './bar';

export default defineComponent({
  components: { Bar },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup() {
    const sizeWidth = ref<string>('0');
    const sizeHeight = ref<string>('0');
    const wrap = ref<Element | null>(null);
    const resize = ref<HTMLElement | null>(null);

    return { wrap, resize, sizeHeight, sizeWidth };
  }
});
</script>

<style lang="less" scoped>
.scrollbar {
  &-box {
    position: relative;
    overflow: hidden;
  }

  &-wrap {
    height: 100%;
    overflow: scroll;

    &-hidden-default {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }

  &-bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 80ms ease;

    &.is-vertical {
      top: 2px;
      width: 6px;

      & > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      left: 2px;
      height: 6px;

      & > div {
        height: 100%;
      }
    }
  }
}

// .scrollbar-content:hover > .scrollbar__bar {
//   opacity: 1;
//   transition: opacity 340ms ease-out;
// }
</style>
