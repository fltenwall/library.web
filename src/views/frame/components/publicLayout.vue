<template>
  <div>
    <public-header />
    <div class="index-center public-layout-header">
      <slot name="header" />
    </div>

    <div class="index-center public-layout-main">
      <div class="public-layout-main-left">
        <slot name="left" />
      </div>
      <a-divider type="vertical" class="divider" />
      <div class="public-layout-main-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import publicHeader from '/@/views/frame/components/publicHeader'

export default defineComponent({
  components: { publicHeader }
})
</script>

<style lang="less" scoped>
.public-layout {
  &-header {
    padding: 80px 0 64px;
    font-size: 25.6px;
    color: #191919;
  }

  &-main {
    .divider {
      height: 240px;
      margin: 0 48px;
      background: #d9d9d9;
    }

    &-right,
    &-left {
      width: 360px;
    }
  }
}
</style>
