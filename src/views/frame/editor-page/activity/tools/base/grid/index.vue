<template>
  <div class="grid-wrap" :style="wrapStyle">
    <div class="grid-content">
      <div v-for="(swiper, sIndex) in swipers" :key="sIndex" class="grid-swiper">
        <div v-for="(item, index) in swiper" :key="index" class="grid-box" :style="boxStyle">
          <!-- 图片 -->
          <template v-if="point.type === 'image' || point.type === 'image-text'">
            <img
              v-if="item.image"
              class="grid-box__image"
              :src="`${MixinConfig.preview}${item.image}`"
              :width="point.iconWidth"
            />
            <icon v-else icon="bi:image" color="#a1a1aa" size="30" />
          </template>
          <!-- 文字 -->
          <div
            v-if="point.type === 'text' || point.type === 'image-text'"
            class="grid-box__text index-hidden-newline"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <!-- 指示器 -->
    <div v-if="swiperSize > 1" class="grid-indicator-wrap">
      <div class="grid-scrollbar" :style="scrollbarStyle">
        <div class="grid-scrollbar-thumb" :style="scrollbarThumbStyle" />
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
    width: ` ${100 / point.showCol}%`,
    height: ` ${100 / point.showRow}%`,
    backgroundColor: point.cardBgColor,
    borderRadius: point.cardBorderRadius
  })
);

const scrollbarStyle = computed(
  (): CSSProperties => ({
    backgroundColor: point.scrollbarColor
  })
);

const scrollbarThumbStyle = computed(
  (): CSSProperties => ({
    backgroundColor: point.scrollbarThumbColor
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
    borderRadius: point.borderRadius
  })
);

const swipers = computed(() => {
  const screen = [];
  const number = point.showRow * point.showCol;
  const size = Math.ceil(point.list.length / number);

  for (let i = 1; i <= size; i++) {
    screen.push(point.list.slice((i - 1) * number, i * number));
  }

  return screen;
});

const swiperSize = computed(() => swipers.value.length);
</script>

<style lang="less" scoped>
.grid {
  &-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-content {
    flex: 1;
    display: flex;
    width: 100%;
  }

  &-swiper {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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

.grid-indicator {
  &-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
  }
}

.grid-scrollbar {
  width: 50px;
  height: 3px;
  overflow: hidden;
  border-radius: 5px;

  &-thumb {
    width: 20px;
    height: 100%;
  }
}
</style>
