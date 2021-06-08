<template>
  <div class="new-user-wrap">
    <div class="new-user-header">
      <div>
        <div class="new-user-header-title">
          新增用户
        </div>
        <div class="new-user-header-content">
          2
        </div>
      </div>
      <div>
        <a-tag color="#52c41a" class="index-no-margin">
          月
        </a-tag>
      </div>
    </div>
    <div class="new-user-main index-middle" />
    <div class="new-user-footer">
      <span>总用户</span>
      <span class="ml-1"> 4 </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.new-user-wrap {
  overflow: hidden;
  background: var(--color-background-override);
}

.new-user {
  &-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0;

    &-title {
      height: 22px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
    }

    &-content {
      height: 38px;
      font-size: 30px;
      line-height: 38px;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  &-main {
    height: 60px;
    padding: 0 20px;

    & > :not(:first-of-type) {
      margin: 0 0 0 10px;
    }
  }

  &-footer {
    padding: 5px 0 0 0;
    margin: 0 20px 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
