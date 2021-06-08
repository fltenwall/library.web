export interface Instance {
  // 开始动画
  startAnimation: (x?: number, y?: number) => void

  // 结束动画
  stopAnimation: (x?: number, y?: number) => void
}
