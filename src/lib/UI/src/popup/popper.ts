import type { Ref, CSSProperties } from 'vue';
import { elementOffset, setStyle } from '/@/utils/elelment';

interface Options {
  placement: 'bottom' | 'left' | 'top' | 'right';

  position: 'absolute';

  gpuAcceleration?: boolean;
}

const DEFAULTS: Options = { placement: 'bottom', position: 'absolute' };

export default class {
  // 参照物
  private _reference: Ref<HTMLNULL>;
  // 弹出层
  private _popper: Ref<HTMLNULL>;
  // 默认配置
  private _options;
  // 偏移时间
  private _offsets: { top?: number; left?: number; updateOffset?: () => void } = {};
  // 功能
  private state: { updateOffset?: () => void } = {};

  constructor(reference: Ref<HTMLNULL>, popper: Ref<HTMLNULL>, options = {}) {
    this._reference = reference;

    this._popper = popper;

    this._options = Object.assign({}, DEFAULTS, options);

    setStyle(this._popper, { position: 'absolute', top: 0 });

    this._updateOffset();

    this._setupEventListeners();
  }

  public update(): void {
    const offsets = this._offsets;

    const styles: CSSProperties = { position: this._options.position };

    if (this._options.gpuAcceleration) {
      styles.transform = `translate(${offsets.left}px,${offsets.top}px)`;
      styles.top = 0;
      styles.left = 0;
    } else {
      styles.left = offsets.left;
      styles.top = offsets.top;
    }

    setStyle(this._popper, styles);
  }

  public destroy(): void {
    this._removeEventListeners();
  }

  private _updateOffset() {
    this._getOffsets();

    this.update();
  }

  private _getOffsets() {
    const popperOffsets: { top?: number; left?: number } = {};

    const rOffsets = getRreferenceRect(this._reference.value!);

    const pRect = getOuterSizes(this._popper as Ref<HTMLElement>);

    const placement = this._options.placement;

    if (['right', 'left'].indexOf(placement) !== -1) {
      popperOffsets.top = rOffsets.top - pRect.width;
      if (placement === 'left') {
        popperOffsets.left = rOffsets.left - pRect.width;
      } else {
        popperOffsets.left = rOffsets.right;
      }
    } else {
      popperOffsets.left = rOffsets.left + rOffsets.width - pRect.width;
      if (placement === 'top') {
        popperOffsets.top = rOffsets.top - pRect.height;
      } else {
        popperOffsets.top = rOffsets.bottom;
      }
    }

    this._offsets = popperOffsets;
  }

  private _setupEventListeners() {
    this.state.updateOffset = this._updateOffset.bind(this);
    window.addEventListener('resize', this.state.updateOffset);
  }

  private _removeEventListeners() {
    window.removeEventListener('resize', this.state.updateOffset!);
  }
}
// 获取参照物宽高大小等
function getRreferenceRect(element: HTMLElement) {
  const { top, left } = elementOffset(element);

  const height = element.offsetHeight;

  const width = element.offsetWidth;

  const right = left + width;

  const bottom = top + height;

  return { top, left, bottom, right, height, width };
}

// 获取 popper 大小
function getOuterSizes(element: Ref<HTMLElement>) {
  const _display = element.value.style.display;
  const _visibility = element.value.style.visibility;

  element.value.style.display = 'block';
  element.value.style.visibility = 'hidden';

  const styles = window.getComputedStyle(element.value);

  const x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  const y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);

  const result = { width: element.value.offsetWidth + y, height: element.value.offsetHeight + x };

  element.value.style.display = _display;
  element.value.style.visibility = _visibility;

  return result;
}
