import { CSSProperties } from 'vue';
import type { BarMap, BarMapItem } from './types';

export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

interface RenderThumbStyle {
  move: number;
  size: string;
  bar: BarMapItem;
}

export function renderThumbStyle({ move, size, bar }: RenderThumbStyle): CSSProperties {
  const style = {} as CSSProperties;

  const translate = `translate${bar.axis}(${move}%)`;
  style[bar.size] = size;
  style.transform = translate;

  return style;
}
