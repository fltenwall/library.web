<template>
  <div class="exception index-center-middle">
    <img :src="image_404" alt="404" class="exception-image">
    <div>
      <div class="exception-title">
        404
      </div>
      <div class="exception-tip">
        抱歉，你访问的页面不存在
      </div>
      <a-button type="primary" size="large" href="/">
        返回首页
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import image_404 from '/@/assets/svg/404.svg'

export default defineComponent({
  setup() {
    //

    return { image_404 }
  }
})
</script>

<style lang="less" scoped>
.exception {
  height: 80%;
  min-height: 500px;

  &-image {
    width: 600px;
    padding-right: 152px;
  }

  &-title {
    margin: 0 0 24px;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    color: #515a6e;
  }

  &-tip {
    margin: 0 0 16px;
    font-size: 20px;
    line-height: 28px;
    color: #808695;
  }
}
</style>
