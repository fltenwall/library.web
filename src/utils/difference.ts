/* eslint-disable @typescript-eslint/no-explicit-any */
export function difference<T>(base: T, other: T): T {
  // 深拷贝
  const deepClone = (value: unknown) => {
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    // 判断是否是数组
    const isArray = Array.isArray(value);

    // 结果
    const result = isArray ? [] : {};

    // 遍历引用类型
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        (result as any)[key] = deepClone((value as any)[key]);
      }
    }

    // 返回结果
    return result;
  };

  // 类型检测
  const typeValid = (value: unknown) => Object.prototype.toString.call(value);

  // 深检测对象差异
  const deepValid = (target: any, source: any) => {
    // 计算数组或者对象长度
    const lengthValid = (value: any) => (Array.isArray(value) ? value.length : Reflect.ownKeys(value).length);

    // 结果
    const result: { value?: unknown } = {};

    if (!(typeValid(target) === typeValid(source))) {
      // 类型不一样, 那么值也就不一样
      result.value = deepClone(target);
    } else if (typeof target !== 'object' || target === null) {
      // 类型为基本类型, 判断值是否相等
      if (target !== source) {
        result.value = deepClone(target);
      }
    } else if (lengthValid(target) !== lengthValid(source)) {
      // 引用类型长度不同, 值也就不同
      result.value = deepClone(target);
    } else {
      // 判断是否数组
      const isArray = Array.isArray(target);

      // 结果
      const _result: any = isArray ? [] : {};

      // 遍历
      for (const key in target) {
        // 判断 key -> target
        if (target.hasOwnProperty(key)) {
          // 子值
          const child = deepValid(target[key], source[key]);

          // 查看 child 是否存在 value
          if (child.hasOwnProperty('value')) {
            // 判断 value 的类型
            if (typeof child.value === 'object') {
              // 判对象 或者数组 的长度, 长度为 0 不添加
              if (!!lengthValid(child)) {
                (_result as any)[key] = child.value;
              }
            } else {
              (_result as any)[key] = child.value;
            }
          }
        }
      }
      // 判对象或者数组的长度, 长度为 0 不添加
      if (!!lengthValid(_result)) {
        result.value = deepClone(_result);
      }
    }

    return result;
  };

  return deepValid(base, other).value as T;
}
