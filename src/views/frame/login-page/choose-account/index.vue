<template>
  <public-layout class="choose-account">
    <template #header> 请选择要登录的帐号 </template>
    <template #left>
      <div class="left">
        <img src="/@/assets/svg/readBook.svg" class="left-image" />
      </div>
      <div class="left-footer">读万卷书 行万里路</div>
    </template>
    <template #right />
  </public-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import publicLayout from '/@/views/frame/components/publicLayout.vue';

export default defineComponent({
  components: { publicLayout },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.choose-account {
  .left {
    &-image {
      display: block;
      width: 200px;
      height: 200px;
      margin: 0 auto;
      transform: scale(2);
    }

    &-footer {
      margin: 50px 0 0;
      font-size: 12px;
      color: #838383;
      text-align: center;
    }
  }
}
</style>
