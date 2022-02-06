import { isString } from '/@/utils/is';

export function useTrim(source: Indexable) {
  const target: Indexable = {};

  for (const key in source) {
    if (isString(source[key])) {
      target[key] = (source[key] as string).trim();
    } else {
      target[key] = source[key];
    }
  }

  return target;
}
