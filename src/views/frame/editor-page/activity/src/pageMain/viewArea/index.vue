<template>
  <scrollbar class="flex-item">
    <div class="view-area" @mousedown.self="handleClickOtherArea" @contextmenu.prevent="handleClickOtherArea">
      <div
        ref="panelRef"
        :class="['view-area-panel relative', pageMode === 1 && 'mobile-mode ']"
        :style="panelStyle"
        @drop="dragEvent.handleDrag"
        @dragover.prevent
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
          :is-size="!item.sizeLock"
          :is-position="!item.positionLock"
          :class="isInArea && 'stop-events'"
          :style="pointStyle[item.id]"
          :move="!!dataItem.isMove"
          :hover="dataItem.hover === item.id"
          :select="pointid === item.id"
          @on-end="handleModuleMoveEnd"
          @on-move="handleModuleMove"
          @on-start="handleModuleMoveStart"
          @on-click="handleModuleClick"
          @mouseenter="mouseEvent.mouseenter(item.id)"
          @mouseleave="mouseEvent.mouseleave"
        >
          <view-content
            v-click-away="hanldeClickDragAway"
            :record="item"
            @on-contextmenu="handleContextmenu"
            @on-right-select="setSelectPoint"
          />

          <!-- 边框 -->
          <div class="view-item-border__x"></div>
          <div class="view-item-border__y"></div>
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
        <teleport to="body">
          <panel-menu :style="menuStyle" @on-delete="handleDeletePoint" @on-copy="handleCopyPoint" />
        </teleport>
      </div>
    </div>
  </scrollbar>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { PointInfo } from '/@/lib/interface/Activity';
import type { Cover } from '../../../utils/usePointPos';
import type { DataItem, Move } from './utils/interface';
import { Scrollbar } from '/@/components/Scrollbar';
import { buildShortUUID } from '/@/utils/uuid';
import { DraggableOffset } from '/@/lib/UI/';
import { pointStore } from '/@/store/modules/activity';
import { moduleSchema } from '../../../tools/index';
import { assign, cloneDeep, throttle } from 'lodash-es';
import { handleStore, limitRules, pointDataModify, rangeHighest, initUpdataCanvasSize } from './utils/index';
import panelMenu from './src/panelMenu.vue';
import usePointPos from '../../../utils/usePointPos';
import viewContent from './src/viewContent.vue';
import { isUndefined } from '/@/utils/is';
import config from '/@/config';
import { loadImageSize } from '/@/utils';
// 面板样式
const panelStyle = reactive<CSSProperties>({ opacity: 1 });
// 页面数据
const pageOptions = computed(() => pointStore.getPageOptionsState);
// 页面模式
const pageMode = computed(() => pageOptions.value.mode);
// 背景图片
const backgroundImage = computed(() => pageOptions.value.backgroundImage);
// 背景颜色
const backgroundColor = computed(() => pageOptions.value.backgroundColor);
// 拖拽数据信息
const pointData = computed(() => pointStore.getPointDataState);
// 拖拽数据样式
const pointStyle = computed(() => pointStore.getPointStyleState);
// 选中数据 id
const pointid = computed({
  set: (id) => pointStore.commitUpdatePointidState({ id }),
  get: () => pointStore.getPointidState
});
// 当前状态
const dataItem = reactive<DataItem>({ pos: {} });
// ref
const panelRef = ref<HTMLNULL>(null);
// 限制
const limit = limitRules();
// 菜单样式变化
const menuStyle = ref<CSSProperties>({});
// 更新画布大小
const updataCanvasSize = initUpdataCanvasSize(panelRef);
//
const isInArea = ref(false);
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
function handleModuleMove({ record, x, y, type }: Move) {
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
function handleModuleMoveEnd({ record, x, y, type }: Move) {
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
function handleModuleMoveStart({ record }: Move) {
  // 设置鼠标按下
  dataItem.state = 'start';
  dataItem.isMove = true;
  dataItem.id = record.id;
  // 传递数据
  setSelectPoint(record.id);
  // 隐藏菜单
  hanldeClickDragAway();
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
    dragEvent.handleDragleave();
    // 获取传来的数据
    const { name, offset, data } = JSON.parse(event.dataTransfer?.getData('tool') || '');
    // 空数据则不添加
    if (isUndefined(name)) return;
    // 获取数据位置
    const { offsetX, offsetY } = event;
    // 获取模型数据
    const schema = cloneDeep(moduleSchema[name]);
    // 合并
    assign(schema, { x: offsetX + offset.x, y: offsetY + offset.y, name }, data);
    // 创建 point
    createPoint(schema);
  },
  // 当被鼠标拖动的对象进入其容器范围内时触发此事件
  handleDragenter() {
    isInArea.value = true;

    panelStyle.opacity = 0.7;
  },
  // 当被鼠标拖动的对象离开其容器范围内时触发此事件
  handleDragleave() {
    isInArea.value = false;

    panelStyle.opacity = 1;
  }
};
// 创建 Point
function createPoint(data: Required<PointInfo>) {
  const schema = data;
  // 唯一值
  schema.id = buildShortUUID();
  // 计算大小
  const { width, height } = usePointSize(schema);
  schema.width = width;
  schema.height = height;
  // 计算位置
  const { x, y } = usePointPos({ type: 'top', schema });
  schema.x = x;
  schema.y = y;
  // 初始化样式
  initPointStyle(schema.id, schema);
  // 传递数据
  setSelectPoint(schema.id);
  // 添加数据
  pointStore.commitAddPointData(schema as Required<PointInfo>);
  // 更新数据
  pointDataModify(schema as Required<PointInfo>);
  // 设置面板高度
  setPanelHeight();
  // 隐藏菜单
  hanldeClickDragAway();
}
// 设置数据
function setSelectPoint(id: string) {
  // 设置选中
  pointid.value = id;
}
// 右键
function handleCancelSelect(e?: MouseEvent) {
  // 点击空白区域隐藏
  if (panelRef.value === e?.target || isUndefined(e)) {
    // 设置为空
    setSelectPoint('');
    // 隐藏菜单
    hanldeClickDragAway();
  }
}
// 处理右键点击
function handleContextmenu({ x, y }: { x: number; y: number }) {
  setMenuStyle({ display: 'block', transform: `translate(${x}px,${y}px)` });
}
// 处理点击拖拽区域以外的地方
function hanldeClickDragAway() {
  setMenuStyle({ display: 'none' });
}
// 设置 右键 数据
const setMenuStyle = throttle((style) => (menuStyle.value = style), 300, { trailing: false });

// 设置面板高度
function setPanelHeight(cover?: Cover) {
  // 高度锁定 禁止高度增加
  if (pageOptions.value.heigheLock) return;
  panelStyle.height = `${rangeHighest(cover) + 100}px`;
  updataCanvasSize();
}
// 处理删除 point
function handleDeletePoint() {
  handleCancelSelect();
  pointDataModify();
}
// 处理复制 point
function handleCopyPoint(data: Required<PointInfo>) {
  const schema = cloneDeep(data);
  schema.x += 10;
  schema.y += 10;
  createPoint(schema);
}
// 处理点击空白区域
function handleClickOtherArea() {
  // 设置为空
  setSelectPoint('');
}
// 处理模块点击
function handleModuleClick({ record }: Move) {
  setSelectPoint(record.id);
  // 隐藏菜单
  hanldeClickDragAway();
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
      const { clientWidth } = panelRef.value!;
      // 设置画布尺寸
      panelStyle.backgroundImage = `url(${src})`;
      panelStyle.minHeight = `${height / (width / clientWidth)}px`;
    }
    updataCanvasSize();
  },
  { immediate: true }
);
// 设置背景颜色
watch(
  () => backgroundColor.value,
  (val) => (panelStyle.backgroundColor = val),
  { immediate: true }
);
// 页面模式发生变化
watch(
  () => pageMode.value,
  () => {
    setPanelHeight();
    updataCanvasSize();
  }
);
</script>
<style lang="less" scoped>
.border-light {
  .view-item-border {
    &__x {
      &::after,
      &::before {
        background: @primary-color;
      }
    }

    &__y {
      &::after,
      &::before {
        background: @primary-color;
      }
    }
  }
}

.view-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 70px;
  margin: 0 auto;

  &-panel {
    width: 52vw;
    min-height: 52vw * 0.7;
    background-color: #fff;
    background-size: 100% 100%;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    user-select: none;
  }

  .view-item {
    z-index: 2;
    box-sizing: border-box;
    transition: all 0.2s ease;
    transform-origin: center center;

    &.stop-events {
      pointer-events: none;
    }

    &[hover='true'] {
      .border-light;
    }

    &[select='true'] {
      .border-light;
    }

    &[move='true'] {
      &[select='true'] {
        z-index: 9999;
        transition: none;
      }
    }

    &-border {
      &__x {
        &::after,
        &::before {
          position: absolute;
          z-index: 9999;
          width: 100%;
          height: 2px;
          content: '';
        }

        &::before {
          top: 0;
          left: 0;
        }

        &::after {
          bottom: 0;
          left: 0;
        }
      }

      &__y {
        &::after,
        &::before {
          position: absolute;
          z-index: 9999;
          width: 2px;
          height: 100%;
          content: '';
        }

        &::before {
          top: 0;
          left: 0;
        }

        &::after {
          top: 0;
          right: 0;
        }
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

.mobile-mode {
  width: 375px;
  min-height: 700px;
}
</style>
