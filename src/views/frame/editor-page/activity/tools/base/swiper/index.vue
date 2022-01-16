<template>
  <div class="swiper-wrap">
    <div class="swiper-container" :style="trackStyle">
      <div v-for="(item, index) in swiper" :key="index" class="preview-image-wrap" :style="imageWrapStyle">
        <img
          v-if="item.image"
          class="preview-image"
          :src="`${MixinConfig.preview}${item.image}`"
          :style="imageStyle"
        />
        <img v-else class="preview-image preview-image__empty" :src="noImage" :style="imageStyle" />
      </div>
    </div>
    <div class="swiper-indicators">
      <div
        v-for="key in count"
        :key="key"
        :class="`swiper-indicator ${state.active % count === key - 1 ? 'swiper-indicator__select' : ''}`"
      ></div>
    </div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch } from 'vue';
import noImage from '/@/assets/svg/noImage.svg';

export default defineComponent({
  inheritAttrs: false
});
</script>

<!-- setup 执行项 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { Schema } from './schema';
import { reactive, useAttrs, computed } from 'vue';

const attrs = useAttrs();

const state = reactive({ offset: 0, active: 0, swiping: false });

const point = reactive<Schema>(attrs as unknown as Schema);

const swiper = computed(() => [...point.list, point.list[0]]);

const count = computed(() => point.list.length);

const imageStyle = computed(
  (): CSSProperties => ({
    width: `${(point.width || 0) - point.padding * 2}px`,
    height: `${(point.height || 0) - point.padding * 2}px`,
    borderRadius: `${point.borderRadius}px`
  })
);

const trackStyle = computed(
  (): CSSProperties => ({
    transitionDuration: `${state.swiping ? 0 : point.duration}ms`,
    transform: `translate${point.vertical ? 'Y' : 'X'}(${state.offset}px)`
  })
);

const imageWrapStyle = computed(
  (): CSSProperties => ({
    padding: `${point.padding}px`
  })
);

let autoplayTimer: NodeJS.Timeout;

const stopAutoplay = () => clearTimeout(autoplayTimer);

const move = () => {
  if (state.active > count.value) {
    // 最后一个
    state.active = 0;

    state.swiping = true;
  } else {
    state.swiping = false;
  }

  state.offset = -1 * (point.width || 0) * state.active;
};

const next = () => {
  state.active += 1;

  move();
};

const autoplay = () => {
  stopAutoplay();

  if (count.value <= 1) return;

  autoplayTimer = setTimeout(() => {
    next();

    autoplay();
  }, point.autoplay);
};

watch(() => [point.list.length], autoplay);

onMounted(autoplay);

onUnmounted(stopAutoplay);
</script>

<style lang="less" scoped>
.preview-image {
  &-wrap {
    flex-shrink: 0;
  }

  &__empty {
    background: #fff;
  }
}

.swiper-container {
  position: relative;
  display: flex;

  ::v-deep(img) {
    pointer-events: none;
  }
}

.swiper-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.swiper-indicator {
  width: 5px;
  height: 5px;
  margin: 10px 2px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.3;

  &__select {
    opacity: 1;
  }
}
</style>
