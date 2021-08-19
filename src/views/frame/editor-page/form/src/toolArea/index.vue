<template>
  <div class="tool-area reactive">
    <div class="tool-area-switch">
      <a-tabs tab-position="left" @change="handleTabChange">
        <a-tab-pane v-for="(item, key) in viewList" :key="key">
          <template #tab>
            <Icon :icon="pointConfigs.icon[key]" size="18" />
            <div class="pt-1">
              {{ pointConfigs.name[key] }}
            </div>
          </template>
        </a-tab-pane>
        <a-tab-pane>
          <template #tab>
            <Icon icon="ant-design:user-outlined" size="18" />
            <div class="pt-1">我的</div>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
    <GlobalDrawer v-model:value="visible" class="tool-area-panel absolute">
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
          <div class="panel-box-title">
            {{ pointConfigs.name[el] }}
          </div>
        </div>
      </div>
    </GlobalDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { viewList, pointConfigs } from '../../components/tools/index';

export default defineComponent({
  setup() {
    // 折叠面板
    const visible = ref<boolean>(false);
    // 处理拖拽开始
    function handleDragstart(event: DragEvent, name: string) {
      // 获取鼠标点击位置
      const { offsetX, offsetY, target } = event;

      const { clientHeight: height, clientWidth: width } = target as HTMLElement;

      const tool = { name, offset: { x: width / 2 - offsetX, y: height / 2 - offsetY } };

      // 数据传递
      event.dataTransfer?.setData('tool', JSON.stringify(tool));
    }

    // 处理标签切换
    function handleTabChange() {
      visible.value = false;
    }

    return { viewList, visible, pointConfigs, handleDragstart, handleTabChange };
  }
});
</script>

<style lang="less" scoped>
.tool-area {
  z-index: 10;
  display: flex;
  height: 100%;

  &-switch {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 64px;
    padding: 30px 0 0;
    background: #fff;

    ::v-deep(.ant-tabs-left-bar) {
      width: calc(100% - 2px);
      border-right-width: 0;

      .ant-tabs-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 0;
      }

      .ant-tabs-ink-bar {
        left: 0;
        width: 3px;
      }
    }
  }

  &-panel {
    left: 64px;
    width: 240px;
    border-left: 1px solid #f0f0f0;
    box-sizing: content-box;

    .panel {
      &-content {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 0;
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
  }
}
</style>
