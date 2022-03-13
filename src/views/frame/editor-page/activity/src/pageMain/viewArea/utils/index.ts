/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue';
import type { Cover } from '../../../../utils/usePointPos';
import type { PointInfo, BaseSchema } from '/@/lib/interface/Activity';
import { computed, unref } from 'vue';
import { pointStore } from '/@/store/modules/activity';
import { isNumber, isObject } from '/@/utils/is';
import usePointPos from '../../../../utils/usePointPos';
import { debounce } from 'lodash-es';

interface Store {
  id: string;

  key: keyof PointInfo;

  value: PointInfo[keyof PointInfo];
}

interface Position {
  layout: BaseSchema;

  move: BaseSchema;
}

interface LimitRules {
  limitSize: (pos: { x?: number; y?: number }, record: BaseSchema) => BaseSchema;

  limitPosition: (pos: { x: number; y: number }, record: BaseSchema) => Position;
}

// 处理 vuex 使用重载
export function handleStore(type: 'd', { id }: { id: string }): void;

export function handleStore(type: 'u', { id, key, value }: Store): void;

export function handleStore(type: string, { id, key, value }: Store): void {
  const mapState = {
    u: () => {
      // 更新
      pointStore.commitUpdatePointData({ id, key, value: value as never });
    },
    d: () => {
      // 删除
      pointStore.commitDeletePointData({ id });
    }
  };

  mapState[type as 'u' | 'd']();
}

// 拖拽限制规则
export function limitRules(): LimitRules {
  // 画布大小
  const canvasSize = computed(() => pointStore.getCanvasSizeState);
  // 表单配置
  const pageOptions = computed(() => pointStore.getPageOptionsState);
  // 是否是弹性布局
  const isElasticLayout = computed(() => unref(pageOptions).layoutType === 2);

  // 处理限制 宽高
  function limitSize(pos: { y?: number; x?: number } = {}, record: BaseSchema): BaseSchema {
    const { height: CH, width: CW } = canvasSize.value;
    const x = record.x;
    const y = record.y;
    const id = record.id;
    const name = record.name;
    let width = record.width;
    let height = record.height;
    if (isNumber(pos.y)) {
      height = y + height + pos.y > CH ? CH - y : height + pos.y;
    }
    if (isNumber(pos.x)) {
      width = x + width + pos.x > CW ? CW - x : width + pos.x;
    }
    const layout = { x, y, height, width, id, name };

    // 弹性布局
    unref(isElasticLayout) && (layout.y = elasticLayout(layout, layout, CW));

    return layout;
  }

  // 位置信息处理
  function limitPosition(pos: { x: number; y: number }, record: BaseSchema): Position {
    const { height: CH, width: CW } = canvasSize.value;
    const id = record.id;
    const name = record.name;
    const width = record.width;
    const height = record.height;
    const move = { x: pos.x + record.x, y: pos.y + record.y, width, height, id, name };
    const x = move.x > CW - width ? CW - width : move.x <= 0 ? 0 : move.x;
    const y = move.y > CH - height ? CH - height : move.y <= 0 ? 0 : move.y;
    const layout = { x, y, width, height, id, name };
    // 弹性布局
    unref(isElasticLayout) && (layout.y = elasticLayout(move, layout, CW));

    return { layout, move };
  }

  // 弹性布局处理
  function elasticLayout(move: BaseSchema, layout: BaseSchema, CW: number): number {
    const cb = (el: BaseSchema): false | BaseSchema => {
      //
      if (el.y + el.height > move.y + move.height) {
        return el.y >= layout.y ? false : layout;
      }
      // 拖拽块高度 大于 当前块
      if (el.y >= move.y && move.y + move.height > el.y + el.height) {
        return false;
      }
      // 判断是否在可视区移动
      if (move.x > CW - layout.width || move.x <= 0) {
        return layout;
      }
      return move;
    };

    const offset = usePointPos({ type: 'custom', schema: move, ids: [layout.id], cb });

    return offset.y;
  }

  return { limitSize, limitPosition };
}

// 修改全部组件位置
/**
 *
 * @param layout
 * @param custom
 * @returns
 */
export function pointDataModify(layout?: BaseSchema): void {
  // 表单样式配置
  const pageOptions = pointStore.getPageOptionsState;
  // 组件
  const pointData = computed(() => pointStore.getPointDataState);
  // 非弹性布局
  if (pageOptions.layoutType !== 2) return;
  // 当前移动位置
  const cover: Cover = {};
  if (isObject(layout)) {
    cover[layout.id] = layout;
  }
  // 遍历所有组件
  for (const schema of unref(pointData)) {
    if (layout?.id === schema.id) continue;

    const ids = [schema.id];
    // 计算后的位置
    const pos = usePointPos({ type: 'top', schema, ids, cover });
    // 数据不一样再更新
    if (pos.x !== schema.x || pos.y !== schema.y) {
      updatePointStyle(pos.x, pos.y, schema.id);
    }
  }
}

// 样式更新
function updatePointStyle(x: number, y: number, id: string): void {
  pointStore.commitUpdatePointData({ id, key: 'x', value: x as never });
  pointStore.commitUpdatePointData({ id, key: 'y', value: y as never });
  pointStore.commitUpdatePointStyle({ id, key: 'transform', value: `translate(${x}px,${y}px)` });
}

// 区间内最高值
export function rangeHighest(cover?: Cover): number {
  let highest = 0;

  const pointData = pointStore.getPointDataState;

  for (const el of pointData) {
    const y = cover?.[el.id]?.y || el.y;
    const height = cover?.[el.id]?.height || el.height;

    highest = y + height > highest ? y + height : highest;
  }

  return highest;
}

// 更新画布大小
export function initUpdataCanvasSize(panelRef: Ref<HTMLNULL>) {
  return debounce(() => {
    const { width, height } = panelRef.value!.getBoundingClientRect();

    // 更新画布大小
    pointStore.commitUpdataCanvasSize({ key: 'width', value: Math.ceil(width) });
    pointStore.commitUpdataCanvasSize({ key: 'height', value: Math.ceil(height) });
  }, 500);
}
