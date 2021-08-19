/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 重置数据
 */
export function resetDataItem<T>(data: T): void {
  Object.keys(data).forEach((key) => ((data as any)[key] = ''));
}
