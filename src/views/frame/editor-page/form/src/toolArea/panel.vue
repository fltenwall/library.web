<template>
  <div class="panel-search-wrap">
    <div class="panel-search-title">搜索</div>
    <a-input class="panel-search" placeholder="搜索您想要的组件">
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>
  </div>
  <div v-for="(item, key) in viewList" :key="key" class="panel-content">
    <div
      v-for="(el, index) in item"
      :key="index"
      class="panel-box"
      draggable="true"
      @dragstart="handleDragstart($event, el)"
    >
      <div class="index-center-middle flex-item">
        <Icon :icon="pointConfigs.icon[el]" size="20" />
      </div>
      <div class="panel-box-title">{{ pointConfigs.name[el] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { viewList, pointConfigs } from '../../components/tools/index';

export default defineComponent({
  setup() {
    // 处理拖拽开始
    function handleDragstart(event: DragEvent, name: string) {
      // 获取鼠标点击位置
      const { offsetX, offsetY, target } = event;

      const { clientHeight: height, clientWidth: width } = target as HTMLElement;

      const tool = { name, offset: { x: width / 2 - offsetX, y: height / 2 - offsetY } };

      // 数据传递
      event.dataTransfer?.setData('tool', JSON.stringify(tool));
    }

    return { viewList, pointConfigs, handleDragstart };
  }
});
</script>

<style lang="less" scoped>
.panel {
  &-content {
    display: flex;
    flex-wrap: wrap;
  }

  &-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    height: 70px;
    margin: 5px;
    cursor: move;
    border: 2px solid hsla(0, 0%, 62%, 0.24);
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      color: @primary-color;
      border: 2px solid @primary-color;

      .panel-box-title {
        color: @primary-color;
      }
    }

    &-title {
      font-size: 12px;
      color: #767676;
      text-align: center;
    }
  }
}

.panel-search {
  border-radius: 15px;

  &-wrap {
    display: flex;
    align-items: center;
    padding: 20px 5px 10px;
  }

  &-title {
    flex-shrink: 0;
    width: 60px;
    margin: 0 5px 0 0;
    font-weight: 600;
    text-align: center;
  }
}
</style>
