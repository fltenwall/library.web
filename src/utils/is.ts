/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isStrNum(val: string): boolean {
  return /^[0-9]+$/.test(val);
}

export function isObject(val: unknown): boolean {
  return val !== null && is(val, 'Object');
}

export function isEmptyObject(val: any): boolean {
  return isObject(val) && isEmptyArray(Object.keys(val));
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isArray<T>(val: any): val is Array<T> {
  return val && Array.isArray(val);
}

export function isEmptyArray(val: any): boolean {
  return isArray(val) && !!val.length;
}
export function isEmpty(val: any): boolean {
  return isEmptyArray(val) || isEmptyArray(val) || !!val;
}
