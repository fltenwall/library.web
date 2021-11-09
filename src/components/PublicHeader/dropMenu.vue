<template>
  <a-dropdown placement="bottomCenter">
    <slot />
    <template #overlay>
      <a-menu @click="handlemenuClick">
        <a-menu-item key="center">
          <user-outlined />
          <span class="ml-1">个人中心</span>
        </a-menu-item>
        <a-menu-item key="setting">
          <setting-outlined />
          <span class="ml-1">个人设置</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <logout-outlined />
          <span class="ml-1">退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { userStore } from '/@/store/modules/user';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';

export default defineComponent({
  components: { UserOutlined, SettingOutlined, LogoutOutlined },
  setup() {
    const go = useGo();

    // 处理菜单点击
    async function handlemenuClick({ key }: { key: string }) {
      switch (key) {
        // 退出
        case 'logout':
          try {
            await userStore.logout();
            userStore.commitResetState();
            go({ name: PageEnum.BASE_LOGIN });
          } catch (err) {}
          break;
        case 'center':
          go({ name: PageEnum.PERSONAL_CENTER });
          break;
        case 'setting':
          go({ name: PageEnum.PERSONAL_SETTING });
          break;
        default:
          break;
      }
    }

    return { handlemenuClick };
  }
});
</script>

<style lang="less">
.header-title {
  color: inherit;
}
</style>
