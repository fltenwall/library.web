<template>
  <div class="muster-wrap">
    <div class="muster-search-wrap">
      <a-input v-model:value="inputSearch" class="muster-search" placeholder="搜索组件">
        <template #suffix>
          <search-outlined />
        </template>
      </a-input>
    </div>
    <scrollbar v-model:scroll-top="scrollTop" @on-scroll="handleScroll">
      <!-- 搜索工具列表 -->
      <div v-if="isArray(tools)" class="muster-content">
        <panel-box
          v-for="name in tools"
          :key="name"
          :name="name"
          :draggable="baseConfigs.trigger[name] === 'drag'"
        >
          <template #content>
            <icon :icon="baseConfigs.icon[name]" size="20" color="#666" class="mb4" />
          </template>
          <template #title>{{ baseConfigs.label[name] }}</template>
        </panel-box>
      </div>

      <!-- 默认工具列表 -->
      <template v-else>
        <div v-for="(names, key) in tools" :key="key" class="muster-box">
          <div class="muster-title" @dragstart.prevent>{{ baseConfigs.label[key] }}</div>
          <div class="muster-content">
            <template v-for="name in names" :key="name">
              <panel-box
                v-if="baseConfigs.visible[name]"
                :name="name"
                :draggable="baseConfigs.trigger[name] === 'drag'"
              >
                <template #content>
                  <icon :icon="baseConfigs.icon[name]" size="20" color="#666" class="mb4" />
                </template>
                <template #title>{{ baseConfigs.label[name] }}</template>
              </panel-box>
            </template>
          </div>
        </div>
        <!-- 占位 -->
        <div :style="placeholderStyle" />
      </template>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed, ref, unref, watch, onMounted } from 'vue';
import { moduleMuster, baseConfigs } from '../../../../tools/index';
import { isEmpty, isArray, isNull } from '/@/utils/is';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';
import { usePinYin } from '/@/hooks/web/usePinYin';
import panelBox from './panelBox.vue';

const inputSearch = ref<string>('');

const scrollTop = ref<number>(0);
// 标签状态
const tabState = computed(() => pointStore.getTabState);
// 距离顶部高度集合
const topMap: Map<string, number> = new Map();
// 占位符样式
const placeholderStyle = ref<CSSProperties>({});

const isValueUpdateFromInner = ref<boolean>(false);

const tools = computed(() => {
  let result: Recordable<string[]> | string[] = moduleMuster;
  // 判断不是否为空
  if (isEmpty(unref(inputSearch))) {
    const input = usePinYin(unref(inputSearch));
    // 全部组件
    const cts = Object.keys(baseConfigs.pinyin).filter((key) => baseConfigs.visible[key]);
    // 拼音筛选出组件
    const pinyinSelect = cts.filter((key) => baseConfigs.pinyin[key].includes(input));
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
      if (isEmpty(unref(inputSearch)) || isNull(val) || !topMap.has(val)) return;

      scrollTop.value = topMap.get(val) || 0;
    }
  }
);

(function () {
  let sum = 0;
  let list = Object.keys(moduleMuster);
  for (let i = 0; i < list.length; i++) {
    // 获取展示模块高度
    const module = moduleMuster[list[i]].filter((name) => baseConfigs.visible[name]);
    const distance = Math.ceil(module.length / 2) * 125 + 42;

    if (list.length - 1 === i) {
      placeholderStyle.value = { height: `calc(100% - ${distance}px)` };
    }

    topMap.set(list[i], sum);

    sum += distance;
  }

  topMap.set('infinite', Infinity);
})();

// 处理滚动条滚动
function handleScroll(top: number) {
  let last = 'base';
  for (let key of topMap.keys()) {
    const value = topMap.get(key) || 0;
    if (value > top) {
      tabState.value !== key && (isValueUpdateFromInner.value = true);
      // 使用上一个数据 作为 当前选中的标签
      pointStore.commitTabState(last);

      break;
    } else {
      last = key;
    }
  }
}

onMounted(() => {
  scrollTop.value = topMap.get(tabState.value) || 0;
});
</script>

<style lang="less" scoped>
.muster-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.muster {
  &-box:not(:first-of-type) {
    margin-top: 20px;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  &-title {
    height: 22px;
    margin-right: 10px;
    margin-left: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: #292b33;
  }
}

.muster-search {
  font-size: 12px;

  &-wrap {
    display: flex;
    align-items: center;
    padding: 20px 10px 0;
    margin: 0 0 20px;
  }

  ::v-deep(input) {
    font-size: 12px;
  }
}
</style>
