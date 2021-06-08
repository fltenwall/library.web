<template>
  <div v-for="(item, index) in listData" :key="index" class="list-row">
    <div class="right">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </div>
    <div class="left action">
      {{ item.action }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userStore } from '/@/store/modules/user'

export default defineComponent({
  setup() {
    const listData = [
      { title: '账户密码', content: '当前密码强度：强', action: '修改' },
      {
        title: '手机号码',
        content: `已绑定手机：${userStore.getUserInfoState?.mobile}`,
        action: '修改'
      },
      {
        title: '邮箱地址',
        content: `已绑定邮箱：${userStore.getUserInfoState?.email}`,
        action: '修改'
      }
    ]

    return { listData }
  }
})
</script>

<style lang="less" scoped>
.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px;
  margin: 0 0 24px;
  border-bottom: 1px solid #e8eaec;

  .right {
    flex: 1;
  }

  .title {
    margin: 0 0 8px;
  }

  .action {
    color: @primary-color;
    cursor: pointer;
  }

  .content {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
