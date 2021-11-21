import { isBoolean, isFunction } from 'lodash';
import { pointStore } from '/@/store/modules/point';
import { BaseSchema } from '/@/lib/interface/PointInfo';
import { cloneDeep } from 'lodash-es';

export type Cover = Indexable<BaseSchema>;

interface Options {
  type: 'bottom' | 'top' | 'custom';

  schema: BaseSchema;

  ids?: string[];

  cover?: Cover;

  cb?: (el: BaseSchema) => BaseSchema | false;
}

interface BaseOptions {
  type: 'bottom' | 'top';

  schema: BaseSchema;

  ids?: string[];

  cover?: Cover;
}

interface CustomOptions {
  type: 'custom';

  schema: BaseSchema;

  ids?: string[];

  cover?: Cover;

  cb: (el: BaseSchema) => BaseSchema | false;
}

// 计算位置

export default function (options: BaseOptions): { x: number; y: number };

export default function (options: CustomOptions): { x: number; y: number };

export default function (options: Options): { x: number; y: number } {
  const { type, schema, ids, cover, cb } = options;
  const pageOptions = pointStore.getPageOptionsState;
  // 弹性布局
  if (pageOptions.layoutType !== 2) return { x: schema.x, y: schema.y };
  // 差值
  let Y = 0;
  let reduceY = schema.y;
  const X = schema.x;
  const pointData = cloneDeep(pointStore.getPointDataState);
  // 排序 从小到大
  pointData.sort((A, B) => {
    if (A.y !== B.y) return A.y > B.y ? 1 : -1;

    return A.y + A.height > B.y + B.height ? 1 : -1;
  });

  for (const el of pointData) {
    // 忽略 id
    if (ids?.includes(el.id)) continue;

    const x = cover?.[el.id]?.x ?? el.x;
    const y = cover?.[el.id]?.y ?? el.y;
    const width = cover?.[el.id]?.width ?? el.width;
    const height = cover?.[el.id]?.height ?? el.height;

    let target = schema;

    // 以顶部计算
    if (type === 'top' && y > target.y) continue;
    // 以底部计算
    if (type === 'bottom' && y + height > target.y + target.height) continue;
    // 根据回调函数判断
    if (type === 'custom' && isFunction(cb)) {
      const result = cb(el);

      if (isBoolean(result)) continue;

      target = result;
    }

    // 比较的 x 值
    const lo = Math.max(target.x, x);
    const hi = Math.min(target.x + target.width, x + width);
    // 求区间交际
    if (lo > hi) continue;

    // 计算差值
    if (reduceY > target.y - y - height) {
      reduceY = target.y - y - height;

      Y = target.y - reduceY;
    }
  }

  return { x: X, y: Y };
}
