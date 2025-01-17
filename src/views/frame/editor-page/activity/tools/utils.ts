/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PointInfo } from '../../../../../lib/interface/Activity';
import { pointStore } from '../../../../../store/modules/activity';
import { cloneDeep } from 'lodash-es';

type Trigger = 'width' | 'height' | 'x' | 'y' | 'style_zIndex';

type CustomState = Indexable<() => void>;

export function queryPoint(id: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointDataState);

  return unref(pointData).find((el) => el.id === id);
}

function parsePath(path: string) {
  const segments = path.split('.');

  return function (obj: object) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;

      obj = (obj as any)[segments[i]];
    }

    return obj;
  };
}

export function templateInit<T extends PointInfo>(customState: CustomState = {}): Partial<T> {
  // 数据集合
  const dataItem = reactive<Partial<T>>({});

  provide('editor-form', { changeTrigger });

  // 画布大小
  const canvasSize = computed(() => pointStore.getCanvasSizeState);

  const pointInfo = computed(() => pointStore.getPointInfo);

  const pointid = computed(() => pointStore.getPointidState);
  // 内部更新不触发
  let isValueUpdateFromInner = false;

  // 数据变化触发
  watch(
    () => pointInfo.value,
    (val) => {
      if (isValueUpdateFromInner) {
        // changeTrigger 函数触发不更新
        isValueUpdateFromInner = false;
      } else {
        initData(val);
      }
    },
    { immediate: true, deep: true }
  );

  // 数据改变触发
  function changeTrigger(key: Trigger | string) {
    const { height: CH, width: CW } = canvasSize.value;
    const value = parsePath(key)(dataItem) as never;

    isValueUpdateFromInner = true;

    // 修改默认视图数据
    const stateMap = {
      width: () => {
        const x = unref(pointInfo).x || 0;
        const width = x + value > CW ? CW - x : value < 10 ? 10 : value;
        updateBaseContent('width', 'width', width, `${width}px`);
      },
      height: () => {
        const y = unref(pointInfo).y || 0;
        const height = y + value > CH ? CH - y : value < 10 ? 10 : value;
        updateBaseContent('height', 'height', height, `${height}px`);
      },
      x: () => {
        const width = unref(pointInfo).width || 0;
        const x = value + width > CW ? CW - width : value;
        updateBaseContent('x', 'transform', x, `translate(${x}px,${unref(pointInfo).y}px`);
      },
      y: () => {
        const height = unref(pointInfo).height || 0;
        const y = value + height > CH ? CH - height : value;
        updateBaseContent('y', 'transform', y, `translate(${unref(pointInfo).x}px,${y}px`);
      },
      style_zIndex: () => {
        updateBaseContent('style_zIndex', 'zIndex', value, `${value}`);
      },
      other: () => {
        pointStore.commitUpdatePointData({ id: unref(pointid), key, value });
      }
    };

    const stateMethod = customState[key] || stateMap[key as Trigger] || stateMap['other'];

    stateMethod();
  }

  // 更新基本内容
  function updateBaseContent(key: Trigger, styleKey: string, dataValue: number, styleValue: string) {
    dataItem[key] = dataValue;
    pointStore.commitUpdatePointData({ id: unref(pointid), key, value: dataValue as never });
    pointStore.commitUpdatePointStyle({ id: unref(pointid), key: styleKey, value: styleValue });
  }

  // 数据信息 初始化
  function initData(data: PointInfo) {
    Reflect.ownKeys(dataItem as any).forEach((key) => {
      Reflect.deleteProperty(dataItem as any, key);
    });

    Reflect.ownKeys(data!).forEach((key) => {
      (dataItem as any)[key] = cloneDeep(data![key as string]);
    });
  }

  return dataItem as Partial<T>;
}
