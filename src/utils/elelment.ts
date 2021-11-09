/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref, CSSProperties } from 'vue';
import { isNumber } from '/@/utils/is';

export const elementOffset = (el: HTMLNULL): { top: number; left: number } => {
  const offset = { top: 0, left: 0 };
  if (el === null) return offset;
  offset.top = el.offsetTop;
  offset.left = el.offsetLeft;
  if (el.offsetParent !== null) {
    const offsetParent = elementOffset(el.offsetParent as HTMLElement);
    offset.top += offsetParent.top;
    offset.left += offsetParent.left;
  }
  return offset;
};

// 获取浏览器高度
export const browserClient = (): { width: number; height: number } => {
  return {
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  };
};

// 设置样式
export const setStyle = (element: Ref<HTMLNULL>, styles: CSSProperties): void => {
  const units = ['width', 'height', 'top', 'right', 'bottom', 'left'];
  Object.keys(styles).forEach((prop: keyof CSSProperties) => {
    let unit = '';
    if (units.indexOf(prop) !== -1 && isNumber(styles[prop])) {
      unit = 'px';
    }

    (element.value!.style as any)[prop] = `${styles[prop]}${unit}`;
  });
};
