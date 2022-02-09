<template>
  <div class="swiper-wrap" :style="wrapStyle">
    <div class="swiper-container" :style="trackStyle">
      <div v-for="(item, index) in swiper" :key="index" class="preview-image-wrap" :style="imageWrapStyle">
        <img v-if="item?.image" :src="`${MixinConfig.preview}${item.image}`" :style="imageStyle" />
        <a-empty v-else :image="simpleImage" description="" :style="imageStyle" />
      </div>
    </div>
    <div :class="['swiper-indicator', `swiper-indicator__${point.indicatorType}`]">
      <div
        v-for="key in count"
        :key="key"
        class="swiper-indicator-item"
        :style="{ backgroundColor: state.active % count === key - 1 ? selectColor : unselectColor }"
      ></div>
    </div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
export default defineComponent({
  inheritAttrs: false
});
</script>

<!-- setup 执行项 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { Schema } from './schema';
import { Empty } from 'ant-design-vue';

const attrs = useAttrs();

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const state = reactive({ offset: 0, active: 0, swiping: false });

const point = reactive<Schema>(attrs as unknown as Schema);

const swiper = computed(() => [...point.list, point.list[0]]);

const count = computed(() => point.list.length);

const imageStyle = computed(
  (): CSSProperties => ({
    width: `${(point.width || 0) - point.padding * 2}px`,
    height: `${(point.height || 0) - point.padding * 2}px`
  })
);

const wrapStyle = computed(
  (): CSSProperties => ({
    backgroundColor: point.bgColor,
    borderRadius: `${point.borderRadius}px`
  })
);

const trackStyle = computed(
  (): CSSProperties => ({
    transitionDuration: `${state.swiping ? 0 : point.duration}ms`,
    transform: `translate${point.vertical ? 'Y' : 'X'}(${state.offset}px)`
  })
);

const selectColor = computed(() => point.indicatorSelectColor);

const unselectColor = computed(() => point.indicatorUnselectColor);

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
}

.swiper-container {
  position: relative;
  display: flex;

  ::v-deep(img) {
    pointer-events: none;
  }
}

.swiper-indicator {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

  &__dot {
    .swiper-indicator-item {
      width: 5px;
      height: 5px;
      margin: 10px 2px;
      border-radius: 50%;
    }
  }

  &__line {
    .swiper-indicator-item {
      width: 12px;
      height: 4px;
      margin: 10px 2px;
      border-radius: 2px;
    }
  }

  &__select {
    opacity: 1;
  }
}

::v-deep(.ant-empty) {
  position: relative;
  margin: 0;

  &-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
