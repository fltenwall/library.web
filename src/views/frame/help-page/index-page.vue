<template>
  <a-layout class="help-wrap">
    <public-header class="help-header">
      <template #left>
        <img :src="config.logo" class="config-logo" @click="handleTitleClick" />
        <div>
          <span class="config-title index-theme" @click="handleTitleClick">
            {{ config.title }}
          </span>
        </div>
      </template>
    </public-header>
    <a-layout class="help-main">
      <a-layout-sider
        width="260"
        theme="light"
        breakpoint="sm"
        collapsed-width="0"
        :trigger="null"
        @collapse="handelCollapse"
      >
        <index-sider :data-source="dataSource" @on-select="onSelect" />
      </a-layout-sider>
      <a-layout-content class="help-main-content scrollbar">
        <index-content :select-content="selectContent" />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-drawer v-model:visible="drawerVisible" placement="left" :closable="false">
    <index-sider mode="vertical" :data-source="dataSource" @on-select="onSelect" />
  </a-drawer>
  <div
    v-if="collapsedState && !drawerVisible"
    class="index-center-middle levitated-ball default-shadow"
    @click="handleClickBall"
  >
    <menu-outlined />
  </div>
</template>

<script lang="ts">
import type { ProblemManage } from '/@/api/basis-manage/problem-manage';
import { MenuOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, ref, unref } from 'vue';
import config from '/@/config';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';
import indexSider from './index-sider.vue';
import indexContent from './index-content.vue';
import service from '/@/api/anonymous';

export default defineComponent({
  components: { indexSider, indexContent, MenuOutlined },
  setup() {
    const go = useGo();

    const dataSource = ref<ProblemManage[]>([]);

    const selectId = ref<number>();

    const drawerVisible = ref<boolean>(false);

    const collapsedState = ref<boolean>(false);

    // 处理选中
    const onSelect = (id: number) => ((selectId.value = id), (drawerVisible.value = false));

    // 选中内容
    const selectContent = computed(() => {
      let content: undefined | string = '';
      if (unref(dataSource) && unref(selectId)) {
        content = unref(dataSource).find((el) => el.id === unref(selectId))?.text;
      }
      return content;
    });

    // 点击文字页面跳转
    const handleTitleClick = () => go({ name: PageEnum.INDEX_PAGE });

    // 从服务器取得数据 设置列表数据
    async function fetchDataFromServer() {
      const query = { sort: 'sortValue,desc' };
      const { data } = await service.fecthProblemByAny(query);
      const [value] = data.content;
      value && go({ query: { id: value.id } }, true);
      dataSource.value = data.content;
    }

    // 展开-收起时的回调函数
    function handelCollapse(collapsed: boolean) {
      collapsedState.value = collapsed;
    }

    // 处理点击悬浮球
    function handleClickBall() {
      drawerVisible.value = true;
    }

    fetchDataFromServer();

    return {
      config,
      dataSource,
      selectContent,
      drawerVisible,
      collapsedState,
      onSelect,
      handelCollapse,
      handleClickBall,
      handleTitleClick
    };
  }
});
</script>

<style lang="less" scoped>
.help-wrap {
  height: 100vh;
  background: var(--theme-background);
}

.help-header {
  border-bottom: 1px solid #f0f0f0;
}

.config {
  &-logo {
    width: 20px;
    margin: 0 10px 0 20px;
    cursor: pointer;
  }

  &-title {
    font-size: 18px;
    color: var(--theme-font-color);
    cursor: pointer;
  }
}

.help-main {
  flex: 1;
  display: flex;
  height: 0;
  background: #f3f5fb;

  &-content {
    flex: 1;
    margin: 16px;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
  }

  &-help-main-catalog {
    margin: 16px;
  }
}

.levitated-ball {
  position: fixed;
  right: 10px;
  bottom: 20px;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
}

@media screen and (max-width: 576px) {
  .help-header {
    padding-right: 16px;
  }
}
</style>
