/**
 * 获取url参数
 * @param q 待查询的值
 * @returns 返回查找的结果
 */
export const getCurRouteParam = (q: string): string => {
  const m = window.location.search.match(new RegExp(`(\\?|&)${q}=([^&]*)(&|$)`));
  return !m ? '' : decodeURIComponent(m[2]);
};
