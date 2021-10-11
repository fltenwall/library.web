/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Cover } from '../../../../utils/usePointPos';
import type { PointInfo, BaseSchema } from '/@/lib/interface/PointInfo';
import { Ref, computed, unref, onMounted, onBeforeUnmount, inject } from 'vue';
import { pointStore } from '/@/store/modules/point';
import { isNumber, isObject } from '/@/utils/is';
import usePointPos from '../../../../utils/usePointPos';

interface Store {
  uuid: string;

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
export function handleStore(type: 'd', { uuid }: { uuid: string }): void;

export function handleStore(type: 'u', { uuid, key, value }: Store): void;

export function handleStore(type: string, { uuid, key, value }: Store): void {
  const mapState = {
    u: () => {
      // 更新
      pointStore.commitUpdatePointData({ uuid, key, value: value as never });
    },
    d: () => {
      // 删除
      pointStore.commitDeletePointData({ uuid });
    }
  };

  mapState[type as 'u' | 'd']();
}

// 拖拽限制规则
export function limitRules(): LimitRules {
  // 视图大小
  const { getViewSize } = inject('viewSize') as {
    getViewSize: () => { width: number; height: number };
  };
  // 表单配置
  const pageOptions = computed(() => pointStore.getPageOptionsState);
  // 是否是弹性布局
  const isElasticLayout = computed(() => unref(pageOptions).layoutType === 2);

  // 处理限制 宽高
  function limitSize(pos: { y?: number; x?: number }, record: BaseSchema) {
    const { height: CH, width: CW } = getViewSize();
    const x = record.x;
    const y = record.y;
    const uuid = record.uuid;
    let width = record.width;
    let height = record.height;
    if (isNumber(pos.y)) {
      height = y + height + pos.y > CH ? CH - y : height + pos.y;
    }
    if (isNumber(pos.x)) {
      width = x + width + pos.x > CW ? CW - x : width + pos.x;
    }
    const layout = { x, y, height, width, uuid };

    // 弹性布局
    unref(isElasticLayout) && (layout.y = elasticLayout(layout, layout, CW));

    return layout;
  }

  // 位置信息处理
  function limitPosition(pos: { x: number; y: number }, record: BaseSchema): Position {
    const { height: CH, width: CW } = getViewSize();
    const uuid = record.uuid;
    const width = record.width;
    const height = record.height;
    const move = { x: pos.x + record.x, y: pos.y + record.y, width, height, uuid };
    const x = move.x > CW - width! ? CW - width! : move.x <= 0 ? 0 : move.x;
    const y = move.y > CH - height! ? CH - height! : move.y <= 0 ? 0 : move.y;
    const layout = { x, y, width, height, uuid };
    // 弹性布局
    unref(isElasticLayout) && (layout.y = elasticLayout(move, layout, CW));

    return { layout, move };
  }

  // 弹性布局处理
  function elasticLayout(move: BaseSchema, layout: BaseSchema, CW: number): number {
    const cb = (el: BaseSchema): false | BaseSchema => {
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

    const offset = usePointPos({ type: 'custom', schema: move, uuids: [layout.uuid], cb });

    return offset.y;
  }

  return { limitSize, limitPosition };
}

// 视图发送变化
export function viewResize(panelRef: Ref<HTMLElement | null>): void {
  const { setViewSize } = inject('viewSize') as {
    setViewSize: (width: number, height: number) => void;
  };

  const resizeObserver = new ResizeObserver(() => {
    const { clientHeight, clientWidth } = panelRef.value!;
    // 传递数据
    setViewSize(clientWidth, clientHeight);
  });
  // 开始
  onMounted(() => resizeObserver.observe(panelRef.value!));
  // 结束
  onBeforeUnmount(() => resizeObserver.unobserve(panelRef.value!));
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
    cover[layout.uuid] = layout;
  }
  // 遍历所有组件
  for (const schema of unref(pointData)) {
    if (layout?.uuid === schema.uuid) continue;

    const uuids = [schema.uuid];
    // 计算后的位置
    const pos = usePointPos({ type: 'top', schema, uuids, cover });
    // 数据不一样再更新
    if (pos.x !== schema.x || pos.y !== schema.y) {
      updatePointStyle(pos.x, pos.y, schema.uuid);
    }
  }
}

// 样式更新
function updatePointStyle(x: number, y: number, uuid: string): void {
  pointStore.commitUpdatePointData({ uuid, key: 'x', value: x as never });
  pointStore.commitUpdatePointData({ uuid, key: 'y', value: y as never });
  pointStore.commitUpdatePointStyle({ uuid, key: 'transform', value: `translate(${x}px,${y}px)` });
}

// 区间内最高值
export function rangeHighest(cover?: Cover): number {
  let highest = 0;

  const pointData = pointStore.getPointDataState;

  for (const el of pointData) {
    const y = cover?.[el.uuid]?.y || el.y;
    const height = cover?.[el.uuid]?.height || el.height;

    highest = y + height > highest ? y + height : highest;
  }

  return highest;
}
