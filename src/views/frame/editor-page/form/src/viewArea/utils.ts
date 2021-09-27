/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, unref, onMounted, onBeforeUnmount, inject } from 'vue';
import { PointInfo, BaseSchema } from '/@/lib/interface/PointInfo';
import { pointStore } from '/@/store/modules/point';
import { isNumber } from '/@/utils/is';
import usePointPos from '../../utils/usePointPos';

interface Store {
  uuid: string;

  key: keyof PointInfo;

  value: PointInfo[keyof PointInfo];
}

type Place = Required<Pick<PointInfo, 'x' | 'y' | 'width' | 'height' | 'uuid'>>;

interface Position {
  layout: Place;

  move: Place;
}

interface LimitRules {
  limitSize: (pos: { x?: number; y?: number }, uuid: string) => Place;

  limitPosition: (pos: { x: number; y: number }, uuid: string) => Position;
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
  // 拖拽数据信息
  const pointData = computed(() => pointStore.getPointDataState);

  // 处理限制 宽高
  function limitSize(pos: { y?: number; x?: number }, uuid: string) {
    const { height: CH, width: CW } = getViewSize();
    const point = unref(pointData).find((el) => el.uuid === uuid);
    const x = point?.x || 0;
    const y = point?.y || 0;
    let height = point?.height || 0;
    let width = point?.width || 0;
    if (isNumber(pos.y)) {
      height = y + height + pos.y > CH ? CH - y : height + pos.y;
    }
    if (isNumber(pos.x)) {
      width = x + width + pos.x > CW ? CW - x : width + pos.x;
    }
    return { x, y, height, width, uuid };
  }

  // 位置信息处理
  function limitPosition(pos: { x: number; y: number }, uuid: string): Position {
    const { height: CH, width: CW } = getViewSize();
    const point = unref(pointData).find((el) => el.uuid === uuid);
    const width = point!.width!;
    const height = point!.height!;
    const move = { x: pos.x + (point?.x || 0), y: pos.y + (point?.y || 0), width, height, uuid };
    const x = move.x > CW - width! ? CW - width! : move.x <= 0 ? 0 : move.x;
    const y = move.y > CH - height! ? CH - height! : move.y <= 0 ? 0 : move.y;
    let layout = { x, y, width, height, uuid };
    // 弹性布局
    if (pageOptions.value.layoutType === 2) {
      // layout
      const cb = (el: BaseSchema): false => {
        if (el.y > move.y) {
        }
        return false;
      };

      const offset = usePointPos({ type: 'smart', schema: move, uuids: [uuid], cb });
      layout = { ...layout, ...offset };
      console.log({ x, y }, offset);
    }

    return { layout, move };
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
 * @param point 鼠标拖动位置
 * @param pos 计算后放下位置
 * @returns
 */
export function pointDataModify({ move, layout }: Position): void {
  // 表单样式配置
  const pageOptions = pointStore.getPageOptionsState;
  // 组件
  const pointData = computed(() => pointStore.getPointDataState);
  // 非弹性布局
  if (pageOptions.layoutType !== 2) return;
  // 当前移动位置
  const cover = { [layout.uuid]: layout };
  // 遍历所有组件
  for (const schema of unref(pointData)) {
    if (move.uuid === schema.uuid) continue;
    const uuids = [schema.uuid];

    const { x, y } = usePointPos({ type: 'top', schema, uuids, cover });

    updatePointStyle(x, y, schema.uuid);
  }
}

// 样式更新
function updatePointStyle(x: number, y: number, uuid: string): void {
  pointStore.commitUpdatePointData({ uuid, key: 'x', value: x as never });
  pointStore.commitUpdatePointData({ uuid, key: 'y', value: y as never });
  pointStore.commitUpdatePointStyle({ uuid, key: 'transform', value: `translate(${x}px,${y}px)` });
}
