<template>
  <div v-title="'输入账号'" class="forget">
    <public-header class="forget-header" main-class="header-main" />
    <div class="forget-main pr8 pl8">
      <div class="h p4">找回密码</div>
      <div class="index-middle">
        <div class="m-edit">
          <div class="pl5 mt5 mb4">
            <div class="m-title mb1">输入{{ shortTitle }}账号</div>
            <div class="m-tip">输入注册{{ shortTitle }}帐号的手机号或邮件地址</div>
          </div>
          <global-input
            class="input-account"
            type="text"
            placeholder="手机号/邮件地址/图书馆账号"
            :focus-highlight="false"
          />
          <div class="button index-center-middle">下一步</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import publicHeader from '/@/views/frame/components/publicHeader';
import config from '/@/config/';

export default defineComponent({
  components: { publicHeader },
  setup() {
    // 短标题
    const shortTitle = config.shortTitle;
    return {
      shortTitle
    };
  }
});
</script>

<style lang="less" scoped>
@width: 960px;

.forget {
  width: 100vw;
  height: 100vh;
  background: var(--public-header-background);

  &-header {
    ::v-deep(.header-main) {
      width: @width;
      padding: 0;
    }
  }

  &-main {
    width: @width;
    margin: 0 auto;
    background: #fff;

    .h {
      font-size: 24px;
      font-weight: bold;
      color: #000;
      text-align: center;
      border-bottom: 2px solid #f7f7f7;
    }

    .m {
      flex-direction: column;
      min-height: 550px;

      &-edit {
        width: 440px;
      }

      &-title {
        font-size: 16px;
        color: #333;
      }

      &-tip {
        color: #999;
      }

      .input-account {
        height: 42px;
        border-radius: 21px;
      }

      .button {
        width: 212px;
        height: 46px;
        margin: 80px auto 0;
        color: #d6e2f9;
        background-color: #f7f7f7;
        border: 1px solid #dcdcdc;
        border-radius: 22px;
      }
    }
  }
}
</style>
