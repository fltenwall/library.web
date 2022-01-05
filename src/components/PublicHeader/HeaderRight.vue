<template>
  <div class="header-right-action">
    <slot />
    <div v-if="isShowUserInfo" class="ml8">
      <div v-if="userIsLogin">
        <drop-menu>
          <router-link :to="{ name: PageEnum.BASE_HOME }" class="index-middle pointer c000">
            <a-avatar :size="25" :src="`${MixinConfig.preview}${userInfo?.portrait}`">
              <template #icon>
                <user-outlined />
              </template>
            </a-avatar>
            <div class="ml3">
              {{ userInfo.nickname }}
            </div>
          </router-link>
        </drop-menu>
      </div>
      <a-button v-else type="primary" @click="onLoginButton">登 录</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Button as aButton } from '/@/lib/UI/index';
import { useGo } from '/@/hooks/web/usePage';
import { PageEnum } from '/@/enums/pageEnum';
import { userStore } from '/@/store/modules/user';
import { isDef } from '/@/utils/is';
import dropMenu from './dropMenu.vue';

export default defineComponent({
  components: { aButton, dropMenu },
  props: {
    isShowUserInfo: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const go = useGo();

    // 页面跳转
    function onLoginButton() {
      go({ name: PageEnum.BASE_LOGIN });
    }

    // 用户是否登录
    const userIsLogin = computed(() => {
      return isDef(userStore.getUserInfoState?.id);
    });

    // 用户信息
    const userInfo = computed(() => {
      return userStore.getUserInfoState!;
    });

    return { PageEnum, userIsLogin, userInfo, onLoginButton };
  }
});
</script>

<style lang="less" scoped>
.header-right-action {
  display: inline-flex;
  align-items: center;
}
</style>
