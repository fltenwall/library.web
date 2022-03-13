<template>
  <div class="h-full">
    <div class="muster__header">组件库</div>
    <div class="px-3 pb-3 border-b mb-3">
      <a-input v-model:value="inputSearch" placeholder="搜索组件">
        <template #suffix>
          <search-outlined />
        </template>
      </a-input>
    </div>

    <scrollbar>
      <!-- 搜索工具列表 -->
      <template v-if="isArray(tools)">
        <draggable v-bind="options" class="muster-content" :list="tools">
          <template #item="{ element: name }">
            <div class="muster-tool">
              <icon :icon="baseConfigs.icon[name]" class="muster-tool-icon" />
              {{ labelParse(name) }}
            </div>
          </template>
        </draggable>
      </template>

      <!-- 默认工具列表 -->
      <template v-else>
        <div v-for="(names, key) in tools" :key="key" class="muster-box">
          <div class="muster-title" @dragstart.prevent>{{ labelParse(key) }}</div>
          <draggable v-bind="options" class="muster-content" :list="names">
            <template #item="{ element: name }">
              <div class="muster-tool">
                <icon :icon="baseConfigs.icon[name]" class="muster-tool-icon" />
                {{ labelParse(name) }}
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </scrollbar>
  </div>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { baseConfigs, moduleMuster } from '/@editorPage/form/tools/index';
import { isEmpty, isArray, isObject } from '/@/utils/is';
import { usePinYin } from '/@/hooks/web/usePinYin';
import { Scrollbar } from '/@/components/Scrollbar';
import { buildShortUUID } from '/@/utils/uuid';

const options = {
  sort: false,
  itemKey: (name: string) => name,
  group: { name: 'form', pull: 'clone', put: false },
  clone: (name: string) => ({ id: buildShortUUID(), label: labelParse(name), name })
};

const inputSearch = ref<string>('');

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

function labelParse(name: string, key = 'template') {
  const result = baseConfigs.label[name];

  return isObject(result) ? result[key] : result;
}
</script>

<style lang="less" scoped>
.muster__header {
  padding: 20px 10px 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #292b33;
}

.muster-tool {
  display: flex;
  align-items: center;
  height: 36px;
  padding-left: 8px;
  cursor: grab;
  border: 1px solid #e5e6e8;
  border-radius: 6px;

  &:hover {
    color: #0089ff;
    border-color: #0089ff;
  }
}

.muster-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  padding: 0 8px 24px;
}

.muster-title {
  height: 22px;
  margin-right: 10px;
  margin-bottom: 15px;
  margin-left: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #292b33;
}

.muster-tool-icon {
  margin-right: 8px;
  font-size: 15px;
}

.ghost {
  height: 0;
  font-size: 0;
  border-width: 0;
  outline: 2px solid #0089ff;

  .muster-tool-icon {
    font-size: 0;
  }
}
</style>
