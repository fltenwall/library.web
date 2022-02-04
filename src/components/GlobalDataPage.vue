<template>
  <div class="global-data-page">
    <div class="scrollbar content">
      <slot />
    </div>
    <div class="index-footer-block">
      <a-button @click="onClosePage"> 返回 </a-button>
      <slot v-if="mode !== -1" name="footer-block" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    mode: {
      type: Number as PropType<number>,
      default: undefined
    }
  },
  setup() {
    const { back } = useRouter();

    /**
     * 页面点击关闭触发函数
     */
    const onClosePage = () => back();

    return { onClosePage };
  }
});
</script>

<style lang="less">
.global-data-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 16px;

  .content {
    flex: 1;
    height: 0;
    overflow: auto;
  }

  .ant-form-item {
    display: inline-flex;
    width: 35%;
    padding-right: 16px;
  }
}

@media screen and (max-width: 1200px) {
  .global-data-page {
    .ant-form-item {
      width: 40%;
    }
  }
}

@media screen and (max-width: 1100px) {
  .global-data-page {
    .ant-form-item {
      width: 50%;
    }
  }
}

@media screen and (max-width: 850px) {
  .global-data-page {
    .ant-form-item {
      width: 100%;
    }
  }
}
</style>
