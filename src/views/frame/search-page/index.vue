<template>
  <PublicHeader class="search-page-header">
    <template #left>
      <router-link to="/">
        <img :src="MixinConfig.logo" class="w-8 mr-4" />
      </router-link>
      <input-search
        v-model:value="pageInfo.query"
        class="header-search"
        :height="40"
        :prefix="true"
        :suffix="true"
        @on-enter="handleEnter"
      />
    </template>
    <template #right>
      <div class="header-setting">设置</div>
    </template>
  </PublicHeader>
  <div class="flex search-page-content">
    <div class="search-page-content-left">
      <div v-if="searchList.length">
        <div class="header">
          找到约 {{ pageInfo.total }} 条结果 （用时 {{ pageInfo.responseTime }} 秒）
        </div>
        <search-list :data-source="searchList" :search-value="pageInfo.query" />
      </div>
      <search-empty v-else-if="!loading">
        {{ pageInfo.query }}
      </search-empty>
      <div v-if="pageInfo.total" class="data-loading index-center">
        <a-pagination
          :current="pageInfo.page"
          :total="pageInfo.total"
          @change="handelepageChange"
        />
      </div>
    </div>
    <div class="search-page-content-right">
      <a-affix :offset-top="120">
        <search-hot :data-source="HotList" :loading="loading" />
      </a-affix>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';
import { InputSearch } from '/@/lib/UI/';
import { rules } from '/@/utils/regExp';
import { message } from 'ant-design-vue';
import service, { Search, Hot } from '/@/api/search';
import searchList from './search-list.vue';
import searchHot from './search-hot.vue';
import searchEmpty from './search-empty.vue';
import { isNaN } from 'lodash-es';

export default defineComponent({
  components: { InputSearch, searchList, searchEmpty, searchHot },
  setup() {
    const { currentRoute } = useRouter();

    const searchList = ref<Search[]>([]);

    const HotList = ref<Hot[]>([]);

    const loading = ref<boolean>(false);

    const go = useGo();

    const pageInfo = reactive({ total: 0, page: 1, responseTime: 0, query: '' });

    // 按下 Enter 键
    function handleEnter(q: string) {
      q && go({ name: PageEnum.SEARCH_PAGE, query: { q } });
    }

    // 向服务器请求数据
    async function fetchSearchListFromServer() {
      try {
        const query = queryData();
        loading.value = true;
        const sendDate = new Date().getTime();

        console.log(query);
        const data = { content: [], totalElements: 10 };

        // const { data } = await service.fecthList(query)
        const receiveDate = new Date().getTime();
        searchList.value = data.content;
        pageInfo.total = data.totalElements;
        pageInfo.responseTime = (receiveDate - sendDate) / 1000;
      } catch (err) {
        message.error(err.msg);
      } finally {
        loading.value = false;
      }
    }

    // 请求热搜词
    async function fetchHotListFromServer() {
      const { data } = await service.fecthHotList();
      HotList.value = data;
    }

    // 获取搜索数据
    function queryData() {
      const keyword = pageInfo.query.replace(rules.whitespace, '').substr(0, 30);

      return { keyword, page: pageInfo.page - 1, size: 10 };
    }

    // 路由发送变化
    async function routerChange() {
      if (unref(currentRoute).name !== PageEnum.SEARCH_PAGE) return;

      const { q, p } = unref(currentRoute).query;

      const page = parseInt(p as string, 10);

      pageInfo.query = q as string;

      pageInfo.page = !isNaN(page) && page >= 0 ? page : 1;

      await fetchSearchListFromServer();

      await fetchHotListFromServer();
    }

    // 页码发送变化
    function handelepageChange(p: number) {
      go({ name: PageEnum.SEARCH_PAGE, query: { q: pageInfo.query, p } });
    }

    watchEffect(() => currentRoute.value && routerChange());

    return {
      loading,
      pageInfo,
      searchList,
      HotList,
      handleEnter,
      handelepageChange
    };
  }
});
</script>

<style lang="less" scoped>
.search-page {
  &-header {
    position: fixed;
    width: 100%;
    height: 60px;
    padding: 0 40px 0 90px;
    background: var(--theme-background);
    border-bottom: 1px solid #eee;
  }

  &-content {
    padding: 60px 0 0;

    &-left {
      max-width: 780px;
      min-width: 780px;
      padding: 0 40px 0 150px;

      .header {
        height: 40px;
        line-height: 40px;
        color: #70757a;
      }
    }

    &-right {
      padding: 20px 20px 0 80px;
    }

    .data-loading {
      margin: 0 0 40px;

      ::v-deep(.ant-pagination-item) {
        border-color: transparent;

        &-active {
          border-color: transparent;
        }

        &-link {
          border-color: transparent;
        }
      }
    }
  }
}

.header-search {
  width: 675px;
}
</style>
