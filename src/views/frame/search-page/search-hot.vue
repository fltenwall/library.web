<template>
  <div class="search-hot">
    <div v-show="dataSource.length" class="header-title">热搜书名</div>
    <div
      v-for="(item, index) in dataSource"
      :key="item.name"
      class="index-space-between index-middle mb-4"
    >
      <div class="index-middle mr-4">
        <span class="search-hot-item-index" :class="'search-hot-' + (index + 1)">
          {{ index + 1 }}
        </span>
        <router-link
          :to="{ path: '/search', query: { q: item.name } }"
          :title="item.name"
          class="search-hot-item-name index-hidden-newline"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="gray">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Hot } from '/@/api/search';

export default defineComponent({
  props: {
    dataSource: {
      type: Object as PropType<Hot>,
      default: () => ({})
    }
  }
});
</script>

<style lang="less" scoped>
.header-title {
  width: 280px;
  margin: 0 0 15px;
  color: var(--theme-font-color);
}

.search-hot-item {
  &-index {
    width: 18px;
    margin: 0 8px 0 0;
    font-weight: 700;
    color: #9195a3;
  }

  &-name {
    display: inline-block;
    width: 230px;
    color: var(--theme-search-color);
    cursor: pointer;

    &:hover {
      color: var(--theme-search-hover-color);
      text-decoration: underline;
    }
  }
}

.search-hot-1 {
  color: #fe2d46;
}

.search-hot-2 {
  color: #f60;
}

.search-hot-3 {
  color: #faa90e;
}
</style>
