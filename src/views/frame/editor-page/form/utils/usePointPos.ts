import { isBoolean, isFunction } from 'lodash';
import { pointStore } from '/@/store/modules/point';
import { BaseSchema } from '/@/lib/interface/PointInfo';
import { cloneDeep } from 'lodash-es';

interface Options {
  type: Type;

  schema: BaseSchema;

  uuids?: string[];

  cover?: {
    [key: string]: BaseSchema;
  };

  cb?: (el: BaseSchema) => BaseSchema | false;
}

type Type = 'top' | 'bottom' | 'smart';

// 计算位置
export default function (options: Options): { x: number; y: number } {
  const { type, schema, uuids, cover, cb } = options;
  const pageOptions = pointStore.getPageOptionsState;
  // 弹性布局
  if (pageOptions.layoutType !== 2) return { x: schema.x, y: schema.y };
  // 差值
  let Y = 0;
  const X = schema.x;
  let reduceY = schema.y;
  const pointData = cloneDeep(pointStore.getPointDataState);
  // 排序 重小到大
  pointData.sort((A, B) => (A.y > B.y ? 1 : -1));

  for (const el of pointData) {
    // 忽略 uuid
    if (uuids?.includes(el.uuid)) continue;

    const x = cover?.[el.uuid]?.x ?? el.x;
    const y = cover?.[el.uuid]?.y ?? el.y;
    const width = cover?.[el.uuid]?.width ?? el.width;
    const height = cover?.[el.uuid]?.height ?? el.height;

    let target = schema;

    // 以顶部计算
    if (type === 'top' && y > target.y) continue;
    // 以底部计算
    if (type === 'bottom' && y + height > target.y + target.height) continue;
    // 根据回调函数判断
    if (type === 'smart' && isFunction(cb)) {
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
