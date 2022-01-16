<template>
  <div class="swiper-wrap">
    <div class="swiper-container">
      <div v-for="(item, index) in swiper" :key="index" class="preview-image-wrap" :style="imageWrapStyle">
        <img class="preview-image" :src="`${MixinConfig.preview}${item.image}`" :style="imageStyle" />
      </div>
    </div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
import { defineComponent } from 'vue';

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

// const state = reactive({ offset: 0 });

const point = reactive<Schema>(attrs as unknown as Schema);

const swiper = computed(() => [...point.list, point.list[0]]);

const imageStyle = computed(
  (): CSSProperties => ({
    width: `${(point.width || 0) - point.padding * 2}px`,
    height: `${(point.height || 0) - point.padding * 2}px`,
    borderRadius: `${point.borderRadius}px`
  })
);

const imageWrapStyle = computed(
  (): CSSProperties => ({
    padding: `${point.padding}px`
  })
);
</script>

<style lang="less" scoped>
.preview-image {
  &-wrap {
    flex-shrink: 0;
  }
}

.swiper-container {
  display: flex;
  transition-duration: 5ms;

  ::v-deep(img) {
    pointer-events: none;
  }
}
</style>
