/**
 * andv 宽度自适应问题
 */
export function triggerResize(): void {
  const e = document.createEvent('Event');
  e.initEvent('resize', true, true);
  window.dispatchEvent(e);
}
