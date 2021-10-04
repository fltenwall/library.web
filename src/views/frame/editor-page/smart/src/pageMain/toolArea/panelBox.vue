<template>
  <div class="panel-box" draggable="true" @dragstart="handleDragstart($event)">
    <div class="index-center-middle flex-item">
      <Icon :icon="pointConfigs.icon[name]" size="20" />
    </div>
    <div class="panel-box-title">{{ pointConfigs.name[name] }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { pointConfigs } from '../../../tools/index';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    // 处理拖拽开始
    function handleDragstart(event: DragEvent) {
      // 获取鼠标点击位置
      const { offsetX, offsetY, target } = event;

      const { clientHeight: height, clientWidth: width } = target as HTMLElement;

      const name = props.name;

      const offset = { x: width / 2 - offsetX, y: height / 2 - offsetY };

      const tool = { name, offset };

      // 数据传递
      event.dataTransfer?.setData('tool', JSON.stringify(tool));
    }

    return { pointConfigs, handleDragstart };
  }
});
</script>

<style lang="less" scoped>
.panel-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 105px;
  height: 105px;
  margin: 5px 0;
  cursor: move;
  border: 2px solid hsla(0, 0%, 62%, 0.24);
  transition: all 0.3s;

  &:hover {
    color: @primary-color;
    border: 2px solid @primary-color;

    .panel-box-title {
      color: @primary-color;
    }
  }

  &:nth-of-type(2n + 2) {
    margin: 5px 0 5px 10px;
  }

  &-title {
    width: 100%;
    padding: 3px 0;
    font-size: 12px;
    color: #767676;
    text-align: center;
    background: #f5f5f5;
  }
}
</style>
