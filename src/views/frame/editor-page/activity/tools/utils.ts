/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PointInfo } from '/@/lib/interface/PointInfo';
import { computed, unref, provide, ref, watch, reactive } from 'vue';
import { pointStore } from '/@/store/modules/point';

type Trigger = 'width' | 'height' | 'x' | 'y';

export function queryPoint(id: string): PointInfo | undefined {
  const pointData = computed(() => pointStore.getPointDataState);

  return unref(pointData).find((el) => el.id === id);
}

export function templateInit<T extends PointInfo>(): Partial<T> {
  // 数据集合
  const dataItem = reactive<Partial<T>>({});

  provide('editor-form', { changeTrigger });

  // 画布大小
  const canvasSize = computed(() => pointStore.getCanvasSizeState);

  const pointInfo = computed(() => pointStore.getPointInfo);

  const pointid = computed(() => pointStore.getPointidState);
  // 内部更新不触发
  const isValueUpdateFromInner = ref<boolean>(false);

  // 数据变化触发
  watch(
    () => pointInfo.value,
    (val) => {
      if (isValueUpdateFromInner.value) {
        // changeTrigger 函数触发不更新
        isValueUpdateFromInner.value = false;
      } else {
        initData(val);
      }
    },
    { immediate: true, deep: true }
  );

  // 数据改变触发
  function changeTrigger(key: Trigger | string) {
    const { height: CH, width: CW } = canvasSize.value;
    const value = (dataItem as any)[key] as never;
    isValueUpdateFromInner.value = true;

    // 修改默认视图数据
    const mapState = {
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
      other: () => {
        pointStore.commitUpdatePointData({ id: unref(pointid), key, value });
      }
    };

    mapState[key as Trigger] ? mapState[key as Trigger]() : mapState['other']();
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
      (dataItem as any)[key] = data![key as string];
    });
  }

  return dataItem;
}
