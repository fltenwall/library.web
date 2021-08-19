<template>
  <div class="message-notify">
    <card-header>
      <template #left> 消息通知 </template>
      <template #right>
        <a-tooltip placement="top">
          <template #title> 查看更多 </template>
          <EllipsisOutlined class="pointer" />
        </a-tooltip>
      </template>
    </card-header>
    <div class="message-notify-main index-center-middle">
      <empty :image="simpleImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Empty } from 'ant-design-vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import cardHeader from './cardHeader';

export default defineComponent({
  components: { EllipsisOutlined, Empty, cardHeader },
  setup() {
    return {
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
    };
  }
});
</script>

<style lang="less" scoped>
.message-notify {
  height: 348px;
  background: var(--color-background-override);

  &-main {
    padding: 0 20px;
  }
}
</style>
