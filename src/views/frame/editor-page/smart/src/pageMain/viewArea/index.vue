<template>
  <scrollbar>
    <div class="view-area">
      <div
        ref="panelRef"
        class="view-area-panel relative"
        :style="panelStyle"
        @drop="dragEvent.handleDrag"
        @dragover.prevent
        @dragenter="dragEvent.handleDragenter"
        @dragleave="dragEvent.handleDragleave"
        @contextmenu.prevent="handleCancelSelect"
      >
        <!-- 拖拽组件 -->
        <draggable-offset
          v-for="item in pointData"
          :key="item.uuid"
          class="view-item"
          :record="item"
          :is-size="true"
          :class="panelStyle.opacity !== 1 && 'stop-events'"
          :style="pointStyle[item.uuid]"
          :move="!!dataItem.isMove"
          :hover="dataItem.hover === item.uuid"
          :select="pointUUID === item.uuid"
          @on-end="handleMoveEnd"
          @on-move="handleMove"
          @on-start="handleMoveStart"
          @mouseenter="mouseEvent.mouseenter(item.uuid)"
          @mouseleave="mouseEvent.mouseleave"
        >
          <view-content
            v-click-away="hanldeClickDragAway"
            v-bind="item"
            @on-contextmenu="handleContextmenu"
            @on-right-select="setSelectPoint"
          />
        </draggable-offset>

        <!-- 拖拽中才显示, 松开鼠标实际位置 -->
        <div
          v-show="dataItem.state === 'move'"
          class="resize-item"
          :style="{
            width: `${dataItem.pos.layout?.width}px`,
            height: `${dataItem.pos.layout?.height}px`,
            transform: `translate(${dataItem.pos.layout?.x}px,${dataItem.pos.layout?.y}px)`
          }"
        />

        <!-- 右键菜单 -->
        <panel-menu :style="menuStyle" :uuid="pointUUID" @on-delete="handleDeletePoint" />
      </div>
    </div>
  </scrollbar>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { PointInfo, BaseSchema } from '/@/lib/interface/PointInfo';
import type { Cover } from '../../../utils/usePointPos';
import type { DataItem, Move } from './utils/interface';
import { computed, reactive, ref } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { buildShortUUID } from '/@/utils/uuid';
import { DraggableOffset } from '/@/lib/UI/';
import { pointStore } from '/@/store/modules/point';
import { schemaList } from '../../../tools/schema';
import { assign, cloneDeep } from 'lodash-es';
import { handleStore, limitRules, viewResize, pointDataModify, rangeHighest } from './utils/index';
import panelMenu from './src/panelMenu.vue';
import usePointPos from '../../../utils/usePointPos';
import viewContent from './src/viewContent.vue';
import { isUnDef } from '/@/utils/is';

const emit = defineEmits(['on-click-point']);

// 面板样式
const panelStyle = reactive<CSSProperties>({});
// 拖拽数据信息
const pointData = computed(() => pointStore.getPointDataState);
// 拖拽数据样式
const pointStyle = computed(() => pointStore.getPointStyleState);
// 选中数据
const pointUUID = computed({
  set: (uuid) => pointStore.commitUpdatePointUUIDState({ uuid }),
  get: () => pointStore.getPointUUIDState
});
// 当前状态
const dataItem = reactive<DataItem>({ pos: {} });
// ref
const panelRef = ref<HTMLElement | null>(null);

const limit = limitRules();

// 菜单样式变化
const menuStyle = ref<CSSProperties>({});

// 计算组件大小
function usePointSize({ x, y, width: w, height: h }: Required<PointInfo>) {
  const { clientHeight: cH, clientWidth: cW } = panelRef.value!;
  const width = x + w > cW ? cW - x : w;
  const height = y + h > cH ? cH - y : h;
  return { width, height };
}

//  初始化样式
function initPointStyle(uuid: string, { x, y, width, height }: PointInfo) {
  setPointStyle({ uuid, key: 'transform', value: `translate(${x}px,${y}px)` });
  setPointStyle({ uuid, key: 'width', value: `${width}px` });
  setPointStyle({ uuid, key: 'height', value: `${height}px` });
}

// 处理移动
function handleMove({ record, x, y, type }: Move) {
  const mapState = {
    mouse: () => {
      // 计算位置
      const pos = limit.limitPosition({ x, y }, record);
      // 记录位置
      dataItem.pos = pos;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 更新 x, y
      setPointTransform({ uuid: record.uuid, x: pos.move.x, y: pos.move.y });
    },
    ew: () => {
      const layout = limit.limitSize({ x }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 更新宽度
      setPointStyle({ uuid: record.uuid, key: 'width', value: `${layout.width}px` });
      // 更新 x, y
      setPointTransform({ uuid: record.uuid, x: layout.x, y: layout.y });
    },
    ns: () => {
      const layout = limit.limitSize({ y }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 更新高度
      setPointStyle({ uuid: record.uuid, key: 'height', value: `${layout.height}px` });
    },
    se: () => {
      const layout = limit.limitSize({ y, x }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 设置样式
      setPointStyle({ uuid: record.uuid, key: 'width', value: `${layout.width}px` });
      setPointStyle({ uuid: record.uuid, key: 'height', value: `${layout.height}px` });
    }
  };
  mapState[type]();

  setPanelHeight({ [dataItem.uuid!]: dataItem.pos!.layout! });
  // 设置状态
  dataItem.state = 'move';
}

// 处理移动结束
function handleMoveEnd({ record, x, y, type }: Move) {
  // 设置鼠标弹起
  dataItem.state = 'end';
  dataItem.isMove = false;
  dataItem.uuid = '';

  // 没有变化不更新数据
  if (x === 0 && y === 0) return;

  const uuid = record.uuid;

  const mapState = {
    mouse: () => {
      // 更新数据
      handleStore('u', { uuid, key: 'x', value: dataItem.pos.layout?.x });
      handleStore('u', { uuid, key: 'y', value: dataItem.pos.layout?.y });
      // 样式更新
      setPointTransform({ uuid, x: dataItem.pos.layout!.x, y: dataItem.pos.layout!.y });
    },
    ew: () => {
      const { width } = limit.limitSize({ x }, record);
      // 检查大小
      validSize({ key: 'width', value: width! });
      // 位置更新
      mapState['mouse']();
    },
    ns: () => {
      const { height } = limit.limitSize({ y }, record);
      // 检查大小
      validSize({ key: 'height', value: height! });
    },
    se: () => {
      mapState['ns']();
      mapState['ew']();
    }
  };
  // 检测大小
  function validSize({ key, value }: { key: string; value: number }) {
    // 宽高 小于 10 表示删除 否则就是更新数据
    if (value < 10) {
      // 删数数据
      handleStore('d', { uuid });
    } else {
      // 更新数据
      handleStore('u', { uuid, key, value });
    }
  }
  mapState[type]();

  setPanelHeight();
}

// 处理移动开始
function handleMoveStart({ record }: { record: BaseSchema; type: string }) {
  // 设置鼠标按下
  dataItem.state = 'start';
  dataItem.isMove = true;
  dataItem.uuid = record.uuid;
  // 传递数据
  setSelectPoint(record.uuid);
}
// 设置样式
function setPointStyle(options: { uuid: string; key: string; value: string }) {
  pointStore.commitUpdatePointStyle(options);
}

// 设置 transform
function setPointTransform({ uuid, x, y }: { uuid: string; x: number; y: number }) {
  const key = 'transform';
  const value = `translate(${x}px,${y}px)`;
  setPointStyle({ uuid, key, value });
}

const mouseEvent = {
  // 处理鼠标进入
  mouseenter(uuid: string) {
    // 移动中禁止高亮
    !dataItem.isMove && (dataItem.hover = uuid);
  },
  // 处理鼠标离开
  mouseleave() {
    dataItem.hover = '';
  }
};

// 拖拽事件
const dragEvent = {
  // 在一个拖动过程中，释放鼠标键时触发此事件
  handleDrag(event: DragEvent) {
    // 清除透明样式
    panelStyle.opacity = 1;
    // 获取传来的数据
    const { name, offset } = JSON.parse(event.dataTransfer?.getData('tool') || '');
    // 获取数据位置
    const { offsetX, offsetY } = event;
    // 唯一值
    const uuid = buildShortUUID();
    const schema = cloneDeep(schemaList[name]);
    // 合并
    assign(schema, { x: offsetX + offset.x, y: offsetY + offset.y, uuid, name });
    // 计算大小
    const { width, height } = usePointSize(schema as Required<PointInfo>);
    schema.width = width;
    schema.height = height;
    // 计算位置
    const { x, y } = usePointPos({ type: 'top', schema: schema as Required<PointInfo> });
    schema.x = x;
    schema.y = y;
    // 初始化样式
    initPointStyle(uuid, schema);
    // 传递数据
    setSelectPoint(uuid);
    // 添加数据
    pointStore.commitAddPointData(schema as Required<PointInfo>);
    // 更新数据
    pointDataModify(schema as Required<PointInfo>);
    // 设置面板高度
    setPanelHeight();
    // 隐藏菜单
    hanldeClickDragAway();
  },

  // 当被鼠标拖动的对象进入其容器范围内时触发此事件
  handleDragenter() {
    panelStyle.opacity = 0.7;
  },

  // 当被鼠标拖动的对象离开其容器范围内时触发此事件
  handleDragleave() {
    panelStyle.opacity = 1;
  }
};

// 设置数据
function setSelectPoint(uuid: string) {
  // 传递数据
  emit('on-click-point');
  // 设置选中
  pointUUID.value = uuid;
}

// 右键
function handleCancelSelect(e?: MouseEvent) {
  // 点击空白区域隐藏
  if (panelRef.value === e?.target || isUnDef(e)) {
    // 设置为空
    setSelectPoint('');
    // 隐藏菜单
    hanldeClickDragAway();
  }
}

// 处理右键点击
function handleContextmenu({ x, y }: { x: number; y: number }) {
  menuStyle.value = { display: 'block', transform: `translate(${x}px,${y}px)` };
}

// 处理点击拖拽区域以外的地方
function hanldeClickDragAway() {
  menuStyle.value = { display: 'none' };
}
// 设置面板高度
function setPanelHeight(cover?: Cover) {
  panelStyle.height = `${rangeHighest(cover) + 100}px`;
}

// 处理删除 point
function handleDeletePoint() {
  handleCancelSelect();

  pointDataModify();
}
// 监听视图变化
viewResize(panelRef);
</script>

<style lang="less" scoped>
.view-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 70px;
  margin: 0 300px 0 0;

  &-panel {
    width: 90%;
    min-height: calc(100vh - 194px);
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    user-select: none;
  }

  .view-item {
    z-index: 2;
    border: 2px solid transparent;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &.stop-events {
      pointer-events: none;
    }

    &[hover='true'] {
      cursor: move;
      border-color: @primary-color;
    }

    &[select='true'] {
      border-color: @primary-color;
    }

    &[move='true'] {
      &[select='true'] {
        transition: none;
      }
    }
  }

  .resize-item {
    position: absolute;
    z-index: 1;
    background: #ffccc7;
    opacity: 0.6;
  }
}
</style>
