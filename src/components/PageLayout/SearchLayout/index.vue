<template>
  <div class="search-layout" :style="{ height }">
    <a-form layout="inline" :label-col="{ flex: '70px' }">
      <template v-for="item in options" :key="item.key">
        <a-form-item v-show="item.open" class="search-item" :label="item.label">
          <component :is="item.component" v-model:value="queryData[item.key]" />
        </a-form-item>
      </template>
      <!-- 按钮 -->
      <div class="search-button-warp search-item" :style="{ transform }">
        <a-button type="primary" @click="onSearchData">查询</a-button>
        <a-button @click="onResetData">重置</a-button>
        <down-out-button v-show="number" :is-open="isOpen" @click="onOpen" />
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref, reactive } from 'vue';
import propsOptions from './props';

const props = defineProps(propsOptions);

const emit = defineEmits(['on-instance', 'on-search']);

const queryData = reactive<Indexable>({ sort: 'createTime,desc' });
// 搜索是否展开
const isOpen = ref<boolean>(false);
// 偏移高度
const base = 56;
const size = computed(() => props.options.length);
const number = computed(() => (size.value / 3) | 0);

const options = computed(() =>
  props.options.map((el, index) => {
    const open = unref(isOpen) ? true : index <= 1;
    return { ...el, open };
  })
);

const transform = computed(() => `translateY(${unref(isOpen) ? number.value * base : 0}px)`);

const height = computed(() => `${unref(isOpen) ? (number.value + 1) * base : base}px`);

const onOpen = () => (isOpen.value = !isOpen.value);
// 重置数据
const onResetData = () => {
  const ignore = new Set(['page', 'pageSize', 'sort']);
  const omit = (prop: string) => Reflect.deleteProperty(queryData, prop);
  Object.keys(queryData).forEach((prop) => !ignore.has(prop) && omit(prop));
};

const onSearchData = () => emit('on-search');

emit('on-instance', { getSearchData: () => queryData });
</script>

<style lang="less" scoped>
.search-layout {
  position: relative;
  padding: 24px 16px 0;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #e8eaec;
  box-sizing: content-box;
  transition: height 0.2s ease;
}

.search-button-warp {
  position: absolute;
  top: 24px;
  right: 16px;
  text-align: right;
  background-color: #fff;
  transition: transform 0.2s ease;

  button:not(:last-of-type) {
    margin: 0 10px 0 0;
  }
}

.search-item {
  margin-bottom: 24px;
}

.search-item,
.search-button-warp {
  width: calc(33.3333% - 10.7px);

  &:nth-of-type(3n) {
    margin-right: 0;
  }
}
</style>
