<template>
  <scrollbar class="flex-item">
    <div class="view-area" @click="handleClickOtherArea" @contextmenu.prevent="handleClickOtherArea">
      <div
        ref="panelRef"
        class="view-area-panel relative"
        :style="[panelStyle, `width: ${modeMap.get(canvasMode)}`]"
        @drop="dragEvent.handleDrag"
        @dragover.prevent
        @click.stop
        @dragenter="dragEvent.handleDragenter"
        @dragleave="dragEvent.handleDragleave"
        @contextmenu.prevent.stop="handleCancelSelect"
      >
        <!-- 拖拽组件 -->
        <draggable-offset
          v-for="item in pointData"
          :key="item.id"
          class="view-item"
          :record="item"
          :is-size="true"
          :class="panelStyle.opacity !== 1 && 'stop-events'"
          :style="pointStyle[item.id]"
          :move="!!dataItem.isMove"
          :hover="dataItem.hover === item.id"
          :select="pointid === item.id"
          @on-end="handleMoveEnd"
          @on-move="handleMove"
          @on-start="handleMoveStart"
          @mouseenter="mouseEvent.mouseenter(item.id)"
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
        <panel-menu :id="pointid" :style="menuStyle" @on-delete="handleDeletePoint" />
      </div>
    </div>
  </scrollbar>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { PointInfo, BaseSchema } from '/@/lib/interface/PointInfo';
import type { Cover } from '../../../utils/usePointPos';
import type { DataItem, Move } from './utils/interface';
import { computed, reactive, ref, onMounted, watch } from 'vue';
import { Scrollbar } from '/@/components/Scrollbar';
import { buildShortUUID } from '/@/utils/uuid';
import { DraggableOffset } from '/@/lib/UI/';
import { pointStore } from '/@/store/modules/point';
import { moduleSchema } from '../../../tools/index';
import { assign, cloneDeep } from 'lodash-es';
import { handleStore, limitRules, viewResize, pointDataModify, rangeHighest } from './utils/index';
import panelMenu from './src/panelMenu.vue';
import usePointPos from '../../../utils/usePointPos';
import viewContent from './src/viewContent.vue';
import { isUnDef } from '/@/utils/is';
import config from '/@/config';
import { loadImageSize } from '/@/utils';

// 面板样式
const panelStyle = reactive<CSSProperties>({});
// 页面数据
const pageOptions = computed(() => pointStore.getPageOptionsState);
// 画布模式
const canvasMode = computed(() => pageOptions.value.mode);
// 背景图片
const backgroundImage = computed(() => pageOptions.value.backgroundImage);
// 画布尺寸
const modeMap = new Map().set(1, '375px').set(2, 'calc(100vw - 800px)');
// 拖拽数据信息
const pointData = computed(() => pointStore.getPointDataState);
// 拖拽数据样式
const pointStyle = computed(() => pointStore.getPointStyleState);
// 选中数据
const pointid = computed({
  set: (id) => pointStore.commitUpdatePointidState({ id }),
  get: () => pointStore.getPointidState
});
// 当前状态
const dataItem = reactive<DataItem>({ pos: {} });
// ref
const panelRef = ref<HTMLNULL>(null);

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
function initPointStyle(id: string, { x, y, width, height }: PointInfo) {
  setPointStyle({ id, key: 'transform', value: `translate(${x}px,${y}px)` });
  setPointStyle({ id, key: 'width', value: `${width}px` });
  setPointStyle({ id, key: 'height', value: `${height}px` });
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
      setPointTransform({ id: record.id, x: pos.move.x, y: pos.move.y });
    },
    ew: () => {
      const layout = limit.limitSize({ x }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 更新宽度
      setPointStyle({ id: record.id, key: 'width', value: `${layout.width}px` });
      // 更新 x, y
      setPointTransform({ id: record.id, x: layout.x, y: layout.y });
    },
    ns: () => {
      const layout = limit.limitSize({ y }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 更新高度
      setPointStyle({ id: record.id, key: 'height', value: `${layout.height}px` });
    },
    se: () => {
      const layout = limit.limitSize({ y, x }, record);
      // 记录位置
      dataItem.pos.layout = layout;
      // 更新全部数据
      pointDataModify(dataItem.pos.layout!);
      // 设置样式
      setPointStyle({ id: record.id, key: 'width', value: `${layout.width}px` });
      setPointStyle({ id: record.id, key: 'height', value: `${layout.height}px` });
    }
  };
  mapState[type]();

  setPanelHeight({ [dataItem.id!]: dataItem.pos!.layout! });
  // 设置状态
  dataItem.state = 'move';
}

// 处理移动结束
function handleMoveEnd({ record, x, y, type }: Move) {
  // 设置鼠标弹起
  dataItem.state = 'end';
  dataItem.isMove = false;
  dataItem.id = '';

  // 没有变化不更新数据
  if (x === 0 && y === 0) return;

  const id = record.id;

  const mapState = {
    mouse: () => {
      // 更新数据
      handleStore('u', { id, key: 'x', value: dataItem.pos.layout?.x });
      handleStore('u', { id, key: 'y', value: dataItem.pos.layout?.y });
      // 样式更新
      setPointTransform({ id, x: dataItem.pos.layout!.x, y: dataItem.pos.layout!.y });
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
      handleStore('d', { id });
    } else {
      // 更新数据
      handleStore('u', { id, key, value });
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
  dataItem.id = record.id;
  // 传递数据
  setSelectPoint(record.id);
}

// 设置样式
function setPointStyle(options: { id: string; key: string; value: string }) {
  pointStore.commitUpdatePointStyle(options);
}

// 设置 transform
function setPointTransform({ id, x, y }: { id: string; x: number; y: number }) {
  const key = 'transform';
  const value = `translate(${x}px,${y}px)`;
  setPointStyle({ id, key, value });
}

const mouseEvent = {
  // 处理鼠标进入
  mouseenter(id: string) {
    // 移动中禁止高亮
    !dataItem.isMove && (dataItem.hover = id);
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
    const { name, offset, data } = JSON.parse(event.dataTransfer?.getData('tool') || '');
    // 获取数据位置
    const { offsetX, offsetY } = event;
    // 唯一值
    const id = buildShortUUID();
    const schema = cloneDeep(moduleSchema[name]);
    // 合并
    assign(schema, { x: offsetX + offset.x, y: offsetY + offset.y, id, name }, data);
    // 计算大小
    const { width, height } = usePointSize(schema as Required<PointInfo>);
    schema.width = width;
    schema.height = height;
    // 计算位置
    const { x, y } = usePointPos({ type: 'top', schema: schema as Required<PointInfo> });
    schema.x = x;
    schema.y = y;
    // 初始化样式
    initPointStyle(id, schema);
    // 传递数据
    setSelectPoint(id);
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
function setSelectPoint(id: string) {
  // 设置选中
  pointid.value = id;
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

// 处理点击空白区域
function handleClickOtherArea() {
  // 设置为空
  setSelectPoint('');
}

// 设置背景图
watch(
  () => backgroundImage.value,
  async (val) => {
    if (!val) {
      panelStyle.backgroundImage = '';
      panelStyle.minHeight = '';
    } else {
      const src = `${config.preview}${val}`;
      const { width, height } = await loadImageSize(src);
      const canvasWidth = parseInt(modeMap.get(canvasMode.value));
      // 设置画布尺寸
      panelStyle.backgroundImage = `url(${src})`;
      panelStyle.minHeight = `${height / (width / canvasWidth)}px`;
    }
  },
  { immediate: true }
);
// 监听视图变化
onMounted(() => viewResize(panelRef));
</script>

<style lang="less" scoped>
.view-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 70px;
  margin: 0 auto;

  &-panel {
    min-height: 700px;
    background-color: #fff;
    background-size: 100% 100%;
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
