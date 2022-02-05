<template>
  <div class="structure-wrap">
    <div class="structure__header">大纲树</div>

    <scrollbar>
      <div
        v-for="item in pointData"
        :key="item.id"
        :class="[item.id === pointid && 'tree-node__active', 'tree-node']"
        @click="handleSelectPoint(item)"
      >
        <div class="index-middle">
          <div class="tree-node-preview">
            <icon v-if="baseConfigs.icon[item.name]" size="24" :icon="baseConfigs.icon[item.name]" />
            <img v-if="isString(item.src)" :src="item.src" class="tree-node-preview__image" />
          </div>
          <div class="ml2">{{ labelShowParse(item.name) }}</div>
        </div>
      </div>
    </scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { Schema } from '/@/lib/interface/PointInfo';
import { computed } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { pointStore } from '/@/store/modules/point';
import { baseConfigs } from '../../../../tools/index';
import { isObject, isString } from '/@/utils/is';

// 拖拽数据信息
const pointData = computed(() => pointStore.getPointDataState);
// 当前选择的数据信息
const pointid = computed(() => pointStore.getPointidState);
// 处理选中
function handleSelectPoint(record: Schema) {
  pointStore.commitUpdatePointidState(record);
}
// 名称展示
function labelShowParse(name: string, key = 'template') {
  const result = baseConfigs.label[name];

  return isObject(result) ? result[key] : result;
}
</script>

<style lang="less" scoped>
.structure-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.structure__header {
  padding: 20px 10px 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: #292b33;
}

.tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 8px 12px 8px 8px;
  margin: 0 8px 12px 8px;
  cursor: pointer;
  border-radius: 4px;

  &-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
      linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    border: 1px solid #e6e9ef;
    border-radius: 2px;

    &__image {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__active {
    background: rgba(44, 99, 255, 0.05) !important;
  }

  &:hover {
    background: rgba(31, 56, 88, 0.04);
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
