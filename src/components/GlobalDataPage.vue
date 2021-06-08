<template>
  <div class="global-data-page">
    <div class="scrollbar content">
      <slot />
    </div>
    <div class="index-footer-block">
      <a-button @click="onClosePage">
        返回
      </a-button>
      <slot v-if="mode !== -1" name="footer-block" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    mode: {
      type: Number as PropType<number>,
      default: undefined
    }
  },
  setup() {
    const { back } = useRouter()

    /**
     * 页面点击关闭触发函数
     */
    const onClosePage = () => back()

    return { onClosePage }
  }
})
</script>

<style lang="less">
.global-data-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;
    height: 0;
    overflow: auto;
  }
}
</style>
