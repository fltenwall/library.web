<template>
  <div class="panel-search-wrap">
    <a-input v-model:value="inputSearch" class="panel-search" placeholder="搜索您想要的组件">
      <template #prefix>
        <search-outlined />
      </template>
    </a-input>
  </div>
  <scrollbar v-model:scroll-top="scrollTop" class="panel-main" @on-scroll="handleScroll">
    <!-- 搜索工具列表 -->
    <div v-if="isArray(tools)" class="panel-content">
      <panel-box v-for="name in tools" :key="name" :name="name" />
    </div>

    <!-- 默认工具列表 -->
    <template v-else>
      <div v-for="(names, key) in tools" :key="key">
        <div class="panel-title">{{ pointConfigs.label[key] }}</div>
        <div class="panel-content">
          <panel-box v-for="name in names" :key="name" :name="name" />
        </div>
      </div>
      <!-- 占位 -->
      <div :style="placeholderStyle" />
    </template>
  </scrollbar>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, ref, unref, watch } from 'vue';
import { viewList, pointConfigs, pinyin } from '../../../tools/index';
import { isEmpty, isArray, isNull } from '/@/utils/is';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';
import panelBox from './panelBox.vue';

const inputSearch = ref<string>('');

const scrollTop = ref<number>(0);
// 标签状态
const tabState = computed(() => pointStore.getTabState);
// 距离顶部高度集合
const toolsTop: { [prop: string]: number } = {};
// 占位符样式
const placeholderStyle = ref<CSSProperties>({});

const isValueUpdateFromInner = ref<boolean>(false);

const tools = computed(() => {
  let result: { [prop: string]: string[] } | string[] = viewList;
  // 判断不是否为空
  if (isEmpty(unref(inputSearch))) {
    const input = pinyin(unref(inputSearch));
    // 全部组件
    const cts = Object.keys(pointConfigs.pinyin);
    // 拼音筛选出组件
    const pinyinSelect = cts.filter((key) => pointConfigs.pinyin[key].includes(input));
    // key筛选出组件
    const keySelect = cts.filter((key) => key.includes(input));

    result = [...new Set([...pinyinSelect, ...keySelect])];
  }

  return result;
});

watch(
  () => tabState.value,
  (val) => {
    if (isValueUpdateFromInner.value) {
      isValueUpdateFromInner.value = false;
    } else {
      // 判断不是否为空
      if (isEmpty(unref(inputSearch)) || isNull(val)) return;

      scrollTop.value = toolsTop[val] || 0;
    }
  }
);

(function () {
  let sum = 0;
  let list = Object.keys(viewList);
  for (let i = 0; i < list.length; i++) {
    const distance = Math.ceil(viewList[list[i]].length / 2) * 115 + 42;

    if (list.length - 1 === i) {
      placeholderStyle.value = { height: `calc(100% - ${distance}px)` };
    }

    toolsTop[list[i]] = sum;

    sum += distance;
  }

  toolsTop['infinite'] = Infinity;
})();

// 处理滚动条滚动
function handleScroll(top: number) {
  let tops = Object.keys(toolsTop);
  for (let i = 0; i < tops.length; i++) {
    if (toolsTop[tops[i + 1]] > top) {
      tabState.value !== tops[i] && (isValueUpdateFromInner.value = true);

      pointStore.commitTabState(tops[i]);

      break;
    }
  }
}
</script>

<style lang="less" scoped>
.panel {
  &-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  &-title {
    margin: 20px 10px 0;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #292b33;
  }
}

.panel-search {
  border-radius: 15px;

  &-wrap {
    display: flex;
    align-items: center;
    padding: 20px 10px 0;
    margin: 0 0 20px;
  }
}

.panel-main {
  height: 100%;
}
</style>
