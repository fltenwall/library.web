<template>
  <div class="grid-wrap" :style="wrapStyle">
    <div v-for="(item, index) in point.list" :key="index" class="grid-box" :style="boxStyle">
      <!-- 图片 -->
      <img
        v-if="(point.type === 'image' || point.type === 'image-text') && item.image"
        class="grid-box__image"
        :src="`${MixinConfig.preview}${item.image}`"
        :width="point.iconWidth"
      />
      <!-- 文字 -->
      <div
        v-if="point.type === 'text' || point.type === 'image-text'"
        class="grid-box__text index-hidden-newline"
      >
        {{ item.label }}
      </div>
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
import { reactive, useAttrs } from 'vue';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const boxStyle = computed(
  (): CSSProperties => ({
    width: ` ${100 / point.showNum}%`,
    backgroundColor: point.cardBgColor,
    borderRadius: `${point.cardBorderRadius}px`
  })
);

const wrapStyle = computed(
  (): CSSProperties => ({
    paddingTop: `${point.paddingTop}px`,
    paddingRight: `${point.paddingY}px`,
    paddingBottom: `${point.paddingBottom}px`,
    paddingLeft: `${point.paddingY}px`,
    color: point.fontColor,
    fontSize: `${point.fontSize}px`,
    backgroundColor: point.bgColor,
    borderRadius: `${point.radiusTop}px ${point.radiusTop}px ${point.radiusBottom}px ${point.radiusBottom}px`
  })
);
</script>

<style lang="less" scoped>
.grid {
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-box {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__image {
      margin-bottom: 5px;
    }

    &__text {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
