<template>
  <div class="overview-header">
    <div class="overview-header-title">工作台</div>
    <div class="flex mt-4">
      <div class="index-middle">
        <a-avatar :size="60">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <div class="ml-4">
          <div class="content-title">
            <span>{{ userInfo.username }}</span>
            <span>，{{ blessing }}</span>
          </div>
          <div class="content-tips">
            <span>{{ userInfo.description }}</span>
          </div>
        </div>
      </div>
      <div />
    </div>
  </div>
  <a-row type="flex" class="overview-chart" :gutter="[16, 16]">
    <a-col :span="24" :lg="16" class="overview-chart-col">
      <message-notify />
    </a-col>
    <a-col :span="24" :lg="8" class="overview-chart-col">
      <quick-entry />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import quickEntry from './components/quickEntry.vue';
import messageNotify from './components/messageNotify.vue';
import { useBlessing } from '/@/utils/dateFormat';
import { userStore } from '/@/store/modules/user';

export default defineComponent({
  components: { quickEntry, messageNotify },
  setup() {
    //
    const userInfo = userStore.getUserInfoState;

    // 祝福语
    const blessing = useBlessing();

    return { blessing, userInfo };
  }
});
</script>

<style lang="less" scoped>
.overview {
  &-chart {
    padding: 6px 16px 0;
  }

  &-header {
    padding: 20px;
    margin: 6px 0 0;
    background: var(--theme-background);

    &-title {
      font-size: 20px;
      font-weight: 600;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .content-title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
    }

    .content-tips {
      margin-top: 12px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
