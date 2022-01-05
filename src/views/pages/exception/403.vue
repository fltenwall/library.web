<template>
  <div class="exception index-center-middle">
    <img :src="image_403" alt="404" class="exception-image" />
    <div>
      <div class="exception-title">403</div>
      <div class="exception-tip">抱歉，你无权访问该页面</div>
      <a-button type="primary" size="large" href="/"> 返回首页 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import image_403 from '/@/assets/svg/403.svg';

export default defineComponent({
  setup() {
    //

    return { image_403 };
  }
});
</script>

<style lang="less" scoped>
.exception {
  height: 80%;
  min-height: 500px;

  &-image {
    width: 600px;
    padding-right: 152px;
    pointer-events: none;
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
