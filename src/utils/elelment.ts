export const elementOffset = (el: HTMLElement | null): { top: number; left: number } => {
  const offset = { top: 0, left: 0 }
  if (el === null) return offset
  offset.top = el.offsetTop
  offset.left = el.offsetLeft
  if (el.offsetParent !== null) {
    const offsetParent = elementOffset(el.offsetParent as HTMLElement)
    offset.top += offsetParent.top
    offset.left += offsetParent.left
  }
  return offset
}

// 获取浏览器高度
export const browserClient = (): { width: number; height: number } => {
  return {
    width: window.document.documentElement.clientWidth,
    height: window.document.documentElement.clientHeight
  }
}
