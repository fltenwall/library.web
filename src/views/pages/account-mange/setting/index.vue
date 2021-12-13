<template>
  <div class="wrap pt4 pb4 pr4 default-shadow">
    <div class="left">
      <a-menu v-model:selectedKeys="selectedKeys" class="left-menu" mode="inline" @click="handleClick">
        <a-menu-item v-for="(item, key) in menuList" :key="key">
          {{ item }}
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right pl4 pr4">
      <div class="right-header mb3">
        {{ menuList[selectedKeys] }}
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';

const INDEX_NAME = 'account-manage-setting';

export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>();
    const { currentRoute } = useRouter();
    const currentName = currentRoute.value.name as string;
    const go = useGo();

    const menuList = {
      base: '基本设置',
      security: '安全设置',
      custom: '个性化设置',
      binding: '账户绑定'
    };
    selectedKeys.value = [currentName.replace(new RegExp(`${INDEX_NAME}-`), '')];

    // 处理菜单点击
    function handleClick({ keyPath }: { keyPath: string[] }) {
      selectedKeys.value = keyPath;
      go({ name: `${INDEX_NAME}-${keyPath[0]}` });
    }

    return {
      menuList,
      selectedKeys,
      handleClick
    };
  }
});
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  margin: 0 16px 16px;
  background: #fff;
  border-radius: var(--public-order-radius);
}

.left {
  width: 224px;
  border-right: 1px solid #e8e8e8;

  &-menu {
    border-width: 0;
  }
}

.right {
  flex: 1;

  &-header {
    font-size: 20px;
    color: #000;
  }
}
</style>
