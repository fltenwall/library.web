<template>
  <div class="scrollbar-box" :style="{ height }">
    <div ref="wrap" class="scrollbar-wrap scrollbar-wrap-hidden-default">
      <component :is="tag" ref="resize" class="scrollbar-content">
        <slot />
      </component>
    </div>
    <bar :size="sizeWidth" />
    <bar vertical :size="sizeHeight" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import Bar from './bar';

export default defineComponent({
  components: { Bar },
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    distanceToEdge: {
      // 从边缘到触发回调的距离。
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: undefined
    }
  },
  emits: ['on-scroll', 'update:scrollTop', 'on-reach-bottom'],
  setup(props, { emit }) {
    const sizeWidth = ref<string>('0');
    const sizeHeight = ref<string>('0');
    const wrap = ref<Element | null>(null);
    const resize = ref<HTMLNULL>(null);

    watch(
      () => props.scrollTop,
      (top) => {
        wrap.value?.scrollTo({ top: top, behavior: 'smooth' });
      }
    );
    // 移除滚动, 利用 防抖
    const removeScroll = debounce(() => {
      wrap.value?.removeEventListener('scroll', handleScroll, false);
    }, 300);

    // 设置滚动值, 利用 防抖
    const updateScrollTop = debounce(() => {
      emit('update:scrollTop', wrap.value?.scrollTop);
    }, 300);

    // 处理滚动事件
    function handleScroll() {
      const scrollTop = Math.ceil(wrap.value?.scrollTop || 0);
      const clientHeight = wrap.value?.clientHeight || 0;
      const scrollHeight = wrap.value?.scrollHeight || 0;

      emit('on-scroll', scrollTop);

      if (scrollTop + clientHeight + props.distanceToEdge >= scrollHeight) {
        // 滚动至底部时触发
        emit('on-reach-bottom');
      }

      updateScrollTop();
    }

    // 鼠标滑动, 开始监听滚动
    function handleWheel() {
      wrap.value?.addEventListener('scroll', handleScroll, false);

      removeScroll();
    }

    onMounted(() => {
      wrap.value?.addEventListener('mousewheel', handleWheel, false);
      // 火狐浏览器
      wrap.value?.addEventListener('DOMMouseScroll', handleWheel);
    });

    onUnmounted(() => {
      wrap.value?.removeEventListener('mousewheel', handleWheel);
      // 火狐浏览器
      wrap.value?.removeEventListener('DOMMouseScroll', handleWheel);
    });

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

  &-content {
    height: 100%;
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
</style>
