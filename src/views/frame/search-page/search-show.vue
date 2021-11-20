<template>
  <public-header class="search-page-show-header">
    <template #left>
      <router-link to="/" class="index-middle ml-15">
        <img :src="MixinConfig.logo" class="w-6 mr-4" />
        <div class="header-title index-theme">
          {{ MixinConfig.title }}
        </div>
      </router-link>
    </template>
  </public-header>
  <div class="search-page-show-middle">
    <div class="content index-middle">
      <icon icon="ion:arrow-back-outline" size="22" class="icon index-center-middle" @click="back" />
      <span class="title">资源检索</span>
    </div>
  </div>
  <div class="main">
    <div class="flex">
      <div class="index-column flex-space-between">
        <div class="main-row-title-name">
          {{ bookInfo.name }}
        </div>
        <div class="main-row">
          <span class="main-row-title">作 者</span>
          <span>{{ bookInfo.author }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">图书分类</span>
          <span>{{ bookInfo.bookCategory?.name }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">出版社</span>
          <span>{{ bookInfo.publisher }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">价 格</span>
          <span>{{ bookInfo.price }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">出版社</span>
          <span>{{ bookInfo.publisher }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">ISBN</span>
          <span>{{ bookInfo.isbn }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">出版时间</span>
          <span>{{ bookInfo.publicationTime }}</span>
        </div>
        <div class="main-row">
          <span class="main-row-title">描述</span>
          <span>{{ bookInfo.description }}</span>
        </div>
      </div>
    </div>
    <global-table
      bordered
      class="mt-10 default-shadow"
      :loading="loading"
      :data-source="bookDetail"
      :columns="holdInfoColumns"
    >
      <template #status="{ text }">
        <a-tag v-if="text === 'IN_LIBRARY'" color="success"> 未借阅 </a-tag>
        <a-tag v-else-if="text === 'OUT_LIBRARY'" color="processing"> 被借阅 </a-tag>
        <a-tag v-else-if="text === 'LOST'" color="error"> 丢失 </a-tag>
        <a-tag v-else-if="text === 'OVERDUE'" color="warning"> 逾期 </a-tag>
        <a-tag v-else-if="text === 'SUBSCRIBE'" color="purple"> 被预约 </a-tag>
      </template>
      <template #operation="{ record }">
        <div class="index-operation">
          <span v-if="record.status === 'IN_LIBRARY'" @click="handleBorrow(record)">借阅</span>
        </div>
      </template>
    </global-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed } from 'vue';
import { holdInfoColumns } from './search-show';
import { userStore } from '/@/store/modules/user';
import { useRouter } from 'vue-router';
import { isNull } from '/@/utils/is';
import { message } from 'ant-design-vue';
import { useGo } from '/@/hooks/web/usePage';
import { PageEnum } from '/@/enums/pageEnum';

export default defineComponent({
  setup() {
    const { currentRoute, back } = useRouter();

    const bookInfo = ref({});

    const bookDetail = ref([]);

    const loading = ref<boolean>(false);

    const go = useGo();

    // 获取服务器数据
    async function fetchDataByService() {
      try {
        loading.value = true;
        // const { params } = unref(currentRoute)
        // const id = parseInt(params.id as string)
        // const { data } = await service.fecthBookByAny(id)
        // bookInfo.value = data.book
        // bookDetail.value = data.detail
      } catch (err) {
        message.error(`获取资源失败: ${err.msg}`);
      } finally {
        loading.value = false;
      }
    }

    // 用户是否登录
    const userIsLogin = computed(() => {
      return !isNull(userStore.getUserInfoState?.id);
    });

    // 借阅书籍
    async function handleBorrow() {
      // 未登录
      if (!validUserState()) return;
    }

    // 判断用户登录
    function validUserState() {
      if (unref(userIsLogin)) return true;

      // 登录完成再重定向回来
      const redirect = unref(currentRoute).fullPath;
      go({ name: PageEnum.BASE_LOGIN, query: { redirect } });

      return false;
    }

    fetchDataByService();

    return { loading, bookInfo, bookDetail, holdInfoColumns, back, handleBorrow };
  }
});
</script>

<style lang="less" scoped>
.search-page-show {
  &-header {
    height: 60px;
    padding: 0 40px 0 90px;
  }

  &-middle {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .content {
      max-width: 1100px;
      margin: 0 auto 5px;
    }

    .icon {
      width: 30px;
      height: 30px;
      color: #000 !important;
      cursor: pointer;

      &:active {
        background: #dcdee2;
        border-radius: 50%;
      }
    }

    .title {
      margin: 0 0 0 10px;
      font-size: 18px;
    }
  }
}

.header-title {
  font-size: 20px;
  color: var(--theme-font-color);
}

.main {
  height: calc(100% - 94px);
  max-width: 1000px;
  margin: 20px auto 0;
  overflow: auto;

  &-row {
    font-size: 13px;

    &-title {
      display: inline-block;

      &::after {
        margin: 0 8px 0 2px;
        content: ':';
      }

      &-name {
        height: 28px;
        font-size: 18px;
        color: var(--theme-search-color);
      }
    }
  }
}
</style>
