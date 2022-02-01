<template>
  <div class="notice-content index-hidden-newline" :style="wrapStyle">
    <icon icon="icon-park-outline:volume-notice" class="mr2" />
    <div ref="wrapInstance" class="notice-content-main">
      <span ref="contentInstance" class="inline-block" :style="contentStyle" @transitionend="onTransitionEnd">
        {{ point.noticeContent }}
      </span>
    </div>
    <icon v-if="point.closeable" icon="ant-design:close-outlined" class="ml1 pointer" size="12" />
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
import type { Schema } from './schema';
import { reactive, useAttrs, computed, watch, ref, onMounted } from 'vue';
import { debounce } from 'lodash-es';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const contentInstance = ref<HTMLNULL>();

const wrapInstance = ref<HTMLNULL>();

const state = reactive({ offset: 0, duration: 0 });

let wrapWidth = 0;
let contentWidth = 0;

// 内容样式
const contentStyle = computed(() => ({
  transform: state.offset ? `translateX(${state.offset}px)` : '',
  transitionDuration: `${state.duration}s`
}));

// 最外层样式
const wrapStyle = computed(() => ({
  backgroundColor: point.bgColor,
  color: point.fontColor
}));

const reset = debounce(() => {
  const { speed } = point;

  state.offset = 0;
  state.duration = 0;
  contentWidth = contentInstance.value?.offsetWidth || 0;
  wrapWidth = wrapInstance.value?.offsetWidth || 0;

  if (contentWidth > wrapWidth) {
    state.offset = -contentWidth;
    state.duration = contentWidth / +speed;
  }
}, 500);

const update = debounce(() => {
  state.offset = -contentWidth;
  state.duration = contentWidth / +point.speed;
}, 300);

function onTransitionEnd() {
  state.offset = wrapWidth;
  state.duration = 0;

  update();
}

onMounted(reset);

watch(() => [point.noticeContent, point.width, point.closeable], reset);
</script>

<style lang="less" scoped>
.notice-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 12px 0 16px;

  &-main {
    flex: 1;
    overflow: hidden;
  }
}
</style>
