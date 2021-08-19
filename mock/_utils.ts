/**
 * @description 返回成功
 */
export function resultSuccess<T = any>(data: T, { msg = 'OK' } = {}) {
  return { code: 200, data, msg };
}
