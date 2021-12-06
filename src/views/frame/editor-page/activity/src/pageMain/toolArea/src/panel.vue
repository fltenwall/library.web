<template>
  <div class="panel-wrap">
    <div class="panel-search-wrap">
      <a-input v-model:value="inputSearch" class="panel-search" placeholder="搜索您想要的组件">
        <template #prefix>
          <search-outlined />
        </template>
      </a-input>
    </div>
    <scrollbar v-model:scroll-top="scrollTop" @on-scroll="handleScroll">
      <!-- 搜索工具列表 -->
      <div v-if="isArray(tools)" class="panel-content">
        <panel-box v-for="name in tools" :key="name" :name="name">
          <template #content>
            <icon :icon="baseConfigs.icon[name]" size="20" class="mb-4" />
          </template>
          <template #title>{{ baseConfigs.label[name] }}</template>
        </panel-box>
      </div>

      <!-- 默认工具列表 -->
      <template v-else>
        <div v-for="(names, key) in tools" :key="key">
          <div class="panel-title" @dragstart.prevent>{{ baseConfigs.label[key] }}</div>
          <div class="panel-content">
            <template v-for="name in names" :key="name">
              <panel-box v-if="baseConfigs.visible[name]" :name="name">
                <template #content>
                  <icon :icon="baseConfigs.icon[name]" size="20" class="mb-4" />
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
import { moduleGather, baseConfigs } from '../../../../tools/index';
import { isEmpty, isArray, isNull, isUnDef } from '/@/utils/is';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';
import { usePinYin } from '/@/hooks/web/usePinYin';
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
  let result: Recordable<string[]> | string[] = moduleGather;
  // 判断不是否为空
  if (isEmpty(unref(inputSearch))) {
    const input = usePinYin(unref(inputSearch));
    // 全部组件
    const cts = Object.keys(baseConfigs.pinyin);
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
      if (isEmpty(unref(inputSearch)) || isNull(val) || isUnDef(toolsTop[val])) return;

      scrollTop.value = toolsTop[val];
    }
  }
);

(function () {
  let sum = 0;
  let list = Object.keys(moduleGather);
  for (let i = 0; i < list.length; i++) {
    // 获取展示模块高度
    const module = moduleGather[list[i]].filter((name) => baseConfigs.visible[name]);
    const distance = Math.ceil(module.length / 2) * 115 + 42;

    if (list.length - 1 === i) {
      placeholderStyle.value = { height: `calc(100% - ${distance - 1}px)` };
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
    if (toolsTop[tops[i + 1]] >= top) {
      tabState.value !== tops[i] && (isValueUpdateFromInner.value = true);

      pointStore.commitTabState(tops[i]);

      break;
    }
  }
}

onMounted(() => {
  scrollTop.value = toolsTop[tabState.value] || 0;
});
</script>

<style lang="less" scoped>
.panel-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel {
  &-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  &-title {
    height: 22px;
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
</style>
