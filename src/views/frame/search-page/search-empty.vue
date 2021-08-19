<template>
  <p class="nors">
    抱歉没有找到与
    <b class="cc00">
      <slot />
    </b>
    相关的图书。
  </p>
  <div class="tip_head">温馨提示：</div>
  <div class="tip_content">请检查您的输入是否正确</div>
  <div class="tip_content">如图书未收录或者新图书未收录，请提交图书信息给我们</div>
  <div class="tip_content">如有任何意见或建议，请及时反馈给我们</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less" scoped>
.nors {
  margin: 20px 0 0;
  font-size: 18px;
  color: #000;
}

.tip_head {
  font-size: 13px;
  line-height: 28px;
  color: #666;
}

.tip_content {
  font-size: 13px;
  line-height: 28px;
  color: #333;
}
</style>
